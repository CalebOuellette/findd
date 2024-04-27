CREATE MIGRATION m1bteb4gzxbwn5ooucidncmm2kcrptd4lur4lclsvzlpzixv7yexpa
    ONTO initial
{
  CREATE EXTENSION pgvector VERSION '0.5';
  CREATE SCALAR TYPE default::openAIEmbedding EXTENDING ext::pgvector::vector<3072>;
  CREATE TYPE default::User {
      CREATE REQUIRED PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY descriptionEmbedding: default::openAIEmbedding;
      CREATE REQUIRED PROPERTY name: std::str;
  };
};
