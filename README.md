# graphqlBasics
Graphql is a query language.
Alternative to using a Rest Api
Rest Api is an architectural style and an approach for serving and fetching data and graphql in that it's an actual query language
with its own syntax and rules. It still uses HTTP requests under the hud like we normally send to a REST API it's just that we have 
this nice query language sitting on top of that to give us more flexiblity and control about how we make them and what data we want to 
fetch or mutate . The way graphql handles those requests is very different to how REST API would handles them.

Ex: REST API Endpoints
pokemonsite.com/api/pokemon
pokemonsite.com/api/pokemon/123

Drawbacks

1. Over fetching : Getting back more data than we need.

Ex: mysite.com/api/course -> {
                                "id": "1",
                                "title":"Thud",
                                "author":"{...}",
                                "price": "10.99",
                                "thumbnail_url" : "...",
                                "video_url" : "...",
                             },
                             {...},
                             {...},

                             what if we only need "id" and "thumbnail_url" of the differnt courses not all data of the individual courses.

2. Under fetching : Getting back less data than we need , which results in making multiple requests with different endpoints.

Ex: mysite.com/api/course/1 -> {
                                "id": "1",
                                "title":"Thud",
                                "author":"{...}",
                                "price": "10.99",
                                "thumbnail_url" : "...",
                                "video_url" : "...",
                             }
                             we got all the data from the request but we need more data about the author about the courses he has made
                             so we end up making another api call.

                             mysite.com/api/author/1


EX: Graphql Examples

1. Single Endpoints

Ex: mygraphqlsite.com/graphql  -> we gonna send query using graphql to the server it's always going to be sent to probably that single end point and the 
                                  server can handle it. The way we send a query to the server using graphql syntax that looks like this.
                                  
                                  syntax....

                                  Query {
                                    courses {
                                        id,
                                        title,
                                        thumbnail_url
                                    }
                                  }



graphql allows us to fetch nested related data within a single query . (solves the problem of under fetching problem)

      syntax ....

        Query {
            course(id: "1"){
                id,
                title,
                thumbnail_url,
                author {
                    name,
                    id,
                    course {
                        id,
                        title,
                        thumbnail_url
                    }
                }
            }
        }

        the ability to nest any related data we need into a single query insted of making multiple queries .



        command and dependencies

       npm init -y
       npm pkg set type="module"   -> {allows us to use es6 modules}
       npm install @apollo/server graphql
