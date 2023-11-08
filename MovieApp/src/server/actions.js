import HttpError from '@wasp/core/HttpError.js'

export const archiveMovie = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const movie = await context.entities.Movie.findUnique({
    where: { id: args.movieId }
  });
  if (movie.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Movie.update({
    where: { id: args.movieId },
    data: { archived: true }
  });
}

export const createMovie = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const newMovie = await context.entities.Movie.create({
    data: {
      title: args.title,
      year: args.year,
      genres: args.genres,
      category: args.category,
      archived: false,
      user: {
        connect: { id: context.user.id }
      }
    }
  });

  return newMovie;
}