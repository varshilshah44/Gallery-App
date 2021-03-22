module.exports = {
  db: {
    connectionString: `mongodb+srv://varshil:iAnDfqQv0hAHgnmK@cluster0.sctgr.mongodb.net/gallerydb?retryWrites=true&w=majority`,
    options: {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    },
  },

  aws:{
      secretAccessKey:'NQxJXEpWKpSYf2OyV3DT9Kj3z2uZHY8S2vdqUPS2',
      accessKeyId:'AKIAR65GL72HHLHNMRFH',
      region:'ap-south-1'
  },

  jwt:{
      jwtKey:'my-name-is-varshil-and-love-pubg'
  }
};
