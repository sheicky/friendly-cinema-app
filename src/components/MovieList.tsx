"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Movie, Screening } from "@prisma/client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MovieForm from "./MovieForm";

type MovieWithScreenings = Movie & {
  screenings: Screening[];
};

export default function MovieList() {
  const [editingMovie, setEditingMovie] = useState<MovieWithScreenings | null>(
    null
  );
  const queryClient = useQueryClient();

  const { data: movies = [], isLoading } = useQuery<MovieWithScreenings[]>({
    queryKey: ["movies"],
    queryFn: async () => {
      const response = await fetch("/api/movies");
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des films");
      }
      return response.json();
    },
  });

  const deleteMovie = useMutation({
    mutationFn: async (movieId: string) => {
      const response = await fetch(`/api/movies/${movieId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });

  const handleDeleteMovie = async (movieId: string) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce film ?")) {
      try {
        await deleteMovie.mutateAsync(movieId);
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" />
      </div>
    );
  }

  if (editingMovie) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setEditingMovie(null)}
          className="mb-6 px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
        >
          ← Retour à la liste
        </button>
        <MovieForm
          movie={editingMovie}
          onSuccess={() => setEditingMovie(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AnimatePresence mode="popLayout">
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6"
          >
            <div className="flex items-start gap-6">
              {movie.poster && (
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-32 h-48 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                <p className="text-gray-400 mb-4">{movie.duration} min</p>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setEditingMovie(movie)}
                    className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors"
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteMovie(movie.id)}
                    className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {movies.length === 0 && (
        <div className="text-center text-gray-400 py-12">
          Aucun film n'a été ajouté pour le moment
        </div>
      )}
    </div>
  );
}
