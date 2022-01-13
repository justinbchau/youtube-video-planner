// /graphql/resolvers.ts
export const resolvers = {
    Query: {
      getVideos: (_parent, _args, ctx) => {
        return ctx.prisma.ytVideos.findMany()
      },
    },
    Mutation: {
        createVideo: async (_parent, _args, ctx) => {
            const { title } = _args;

            const video = await ctx.prisma.ytVideos.create({
                data: {
                    title,
                }
            })
            return video;
        },
        togglePublished: async (_parent, _args, ctx) => {
            const { id } = _args;

            const selectedVideo = await ctx.prisma.ytVideos.findUnique({
                where: {
                    id
                },
            })

            const updatedVideo = await ctx.prisma.ytVideos.update({
                where: {
                    id: selectedVideo.id
                },
                data: {
                    published: !selectedVideo.published
                }
            })

            return updatedVideo;
        },
        deleteVideo: async (_parent, _args, ctx) => {
            const { id } = _args;

            const deleteMeBitch = await ctx.prisma.ytVideos.delete({
                where: {
                    id
                }
            })
            return deleteMeBitch;
        },
        editTitle: async (_parent, _args, ctx) => {
            const { id, title } = _args;

            const videoToUpdate = await ctx.prisma.ytVideos.update({
                where: {
                    id
                },
                data: {
                    title
                }
            })
            return videoToUpdate;
        }
    }
  }