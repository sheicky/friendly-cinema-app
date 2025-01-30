"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Movie, Screening } from "@prisma/client";
import { motion, AnimatePresence } from "framer-motion";
import MovieCard from "@/components/MovieCard";
import {
  MagnifyingGlassIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

type MovieWithScreenings = Movie & {
  screenings: Screening[];
};

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [languageInput, setLanguageInput] = useState("");
  const [minDuration, setMinDuration] = useState("");
  const [maxDuration, setMaxDuration] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState<MovieWithScreenings[]>(
    []
  );

  const { data: movies = [], isLoading } = useQuery<MovieWithScreenings[]>({
    queryKey: ["movies"],
    queryFn: async () => {
      const response = await fetch("/api/movies");
      return response.json();
    },
  });

  const uniqueCities = [
    ...new Set(movies.flatMap((movie) => movie.screenings.map((s) => s.city))),
  ].sort();

  const uniqueLanguages = [
    ...new Set(movies.map((movie) => movie.language)),
  ].sort();

  const handleSearch = async () => {
    setIsSearching(true);

    // Simule un délai pour voir l'animation
    await new Promise((resolve) => setTimeout(resolve, 800));

    const results = movies.filter((movie) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        movie.title.toLowerCase().includes(searchLower) ||
        movie.director.toLowerCase().includes(searchLower) ||
        movie.actors.some((actor) => actor.toLowerCase().includes(searchLower));

      const cityToCheck = selectedCity || cityInput;
      const matchesCity =
        !cityToCheck ||
        movie.screenings.some((s) =>
          s.city.toLowerCase().includes(cityToCheck.toLowerCase())
        );

      const languageToCheck = selectedLanguage || languageInput;
      const matchesLanguage =
        !languageToCheck ||
        movie.language.toLowerCase().includes(languageToCheck.toLowerCase());

      const matchesDuration =
        (!minDuration || movie.duration >= parseInt(minDuration)) &&
        (!maxDuration || movie.duration <= parseInt(maxDuration));

      return matchesSearch && matchesCity && matchesLanguage && matchesDuration;
    });

    setFilteredMovies(results);
    setIsSearching(false);
  };

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Rechercher un film
          </h1>
          <Link href="/">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Retour à l'accueil</span>
            </motion.button>
          </Link>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Titre, réalisateur ou acteur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
              />
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Ville..."
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                list="cities"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
              />
              <datalist id="cities">
                {uniqueCities.map((city) => (
                  <option key={city} value={city} />
                ))}
              </datalist>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Langue..."
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
                list="languages"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
              />
              <datalist id="languages">
                {uniqueLanguages.map((lang) => (
                  <option key={lang} value={lang} />
                ))}
              </datalist>
            </div>

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Durée min"
                value={minDuration}
                onChange={(e) => setMinDuration(e.target.value)}
                className="w-1/2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
              />
              <input
                type="number"
                placeholder="Durée max"
                value={maxDuration}
                onChange={(e) => setMaxDuration(e.target.value)}
                className="w-1/2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <motion.button
              type="button"
              onClick={handleSearch}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center gap-3 font-medium text-white overflow-hidden shadow-xl hover:shadow-purple-500/25"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              <motion.div
                animate={isSearching ? { rotate: 360 } : {}}
                transition={
                  isSearching
                    ? { duration: 1, repeat: Infinity, ease: "linear" }
                    : {}
                }
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </motion.div>
              <span className="relative">
                {isSearching ? "Recherche en cours..." : "Rechercher"}
              </span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600/50 to-pink-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-500/30 rounded-full" />
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-purple-500 rounded-full animate-search" />
              </div>
              <p className="mt-4 text-purple-400 font-medium">
                Recherche en cours...
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredMovies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-xl"
                >
                  <h3 className="text-2xl font-bold text-gray-400 mb-2">
                    Aucun film ne correspond à votre recherche
                  </h3>
                  <p className="text-gray-500">
                    Essayez de modifier vos critères de recherche ou revenez
                    plus tard pour découvrir de nouveaux films !
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
