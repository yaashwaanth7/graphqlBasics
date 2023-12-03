import {ApolloServer} from "@apollo/server"  // ApolloServer is first to set up the server and config it and tell apollo how to handle data and respond to query's
import {startStandaloneServer} from "@apollo/server/standalone" // this is to just start the server for listening to requests.

// db
import db from "./_db.js";

// types
import { typeDefs } from "./schema.js";


const resolvers = {
 Query : {
    games (){
        return db.games
    },

    reviews(){
        return db.reviews
    },
    authors(){
        return db.authors
    },
    review(_,args){
        
        return db.reviews.find((review)=> review.id === args.id)
    },
    game(_,args){
        return db.games.find((game)=> game.id === args.id )
    },
    author(_,args){
        return db.authors.find((author)=> author.id === args.id )
    },
 },
 // Related data
 Game: {
    // parent argument is the reference to value returned by the parent resolvers
    reviews(parent){
        return db.reviews.filter((r)=> r.game_id === parent.id)
    },
 },
 Author: {
    reviews(parent){
        return db.reviews.filter((r) => r.author_id === parent.id)
    }
 },
 Review: {
    author(parent){
        return db.authors.find((a) => a.id === parent.author_id)
    },
    game(parent){
        return db.authors.find((g) => g.id === parent.game_id)
    },
 }
 
}

// server setup
const server  = new ApolloServer({
 // typeDefs -> full form type defination -> and these are basically descriptions of our datatypes and the relationship they have with other datatypes.
 // or definations of the different types of data we want to expose on our graph.
//  ex : suppose we want to make type def for an author datatype and specify the different fields that author might have like name, avathar , bio etc...
//  the combination of these different types and the relationship to other types and the kinds of queries that can be made combine upto make something
// called a schema.

// schema is something that describes the shape of the graph and the data available on it
typeDefs,

 // resolvers -> it is a bunch of resolver function that determine how we respond to queries for different data on the graph
//   or is a bunch of resolver functions and the resolver functions are there for us to handle any incoming requests and return data to clients.
resolvers
})


const {url} = await startStandaloneServer(server, {
    listen: {port: 4000}
});

console.log(`Server ready at port`, 4000);