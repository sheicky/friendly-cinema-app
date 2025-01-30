import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ message: "Non autorisé" }), {
        status: 401,
      });
    }

    // Supprime d'abord les séances associées
    await prisma.screening.deleteMany({
      where: {
        movieId: params.id,
      },
    });

    // Puis supprime le film
    await prisma.movie.delete({
      where: {
        id: params.id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Erreur suppression film:", error);
    return new NextResponse(
      JSON.stringify({ message: "Erreur lors de la suppression du film" }),
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ message: "Non autorisé" }), {
        status: 401,
      });
    }

    const data = await request.json();

    const movie = await prisma.movie.update({
      where: {
        id: params.id,
      },
      data: {
        title: data.title,
        duration: data.duration,
        language: data.language,
        subtitles: data.subtitles,
        director: data.director,
        actors: data.actors,
        minAge: data.minAge,
        poster: data.poster,
        screenings: {
          deleteMany: {},
          create: {
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
            weekDays: data.weekDays,
            startTime: data.startTime,
            city: data.city,
            address: data.address,
          },
        },
      },
    });

    return NextResponse.json(movie);
  } catch (error) {
    console.error("Erreur modification film:", error);
    return new NextResponse(
      JSON.stringify({ message: "Erreur lors de la modification du film" }),
      { status: 500 }
    );
  }
}
