import HttpError from '@wasp/core/HttpError.js'

export const getMovie = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const movie = await context.entities.Movie.findUnique({
    where: { id: args.id, userId: context.user.id }
  });

  if (!movie) { throw new HttpError(400) }

  return movie;
}

export const getMovies = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Movie.findMany({
    where: {
      user: { id: context.user.id }
    }
  });
}

export const getMoviesByCategory = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const movies = await context.entities.Movie.findMany({
    where: {
      category: args.category,
      userId: context.user.id
    }
  })

  return movies;
}

export const getMoviesByTitle = async ({ title }, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Movie.findMany({
    where: {
      title,
      user: { id: context.user.id }
    }
  })
}

export const getMoviesByYear = async (args, context) => {
  if (!context.user) throw new HttpError(401);

  return context.entities.Movie.findMany({
    where: {
      year: args.year,
      user: { id: context.user.id }
    }
  });
}

export const getMoviesByGenres = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }

  return context.entities.Movie.findMany({
    where: {
      genres: args.genres,
      user: { id: context.user.id }
    }
  });
}