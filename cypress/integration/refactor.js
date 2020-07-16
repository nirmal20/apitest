/// <reference types = "cypress"/>

context('tests for checking comments ', () => {

    

    // function validateEmail(email) {
    //     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     return re.test(String(email).toLowerCase());
    // }


    it('get user details', () => {
        cy.request('/users')
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response).to.have.property('headers')
            expect(response).to.have.property('duration')
            //cy.log(response);
            const body = response.body.find(function(e){
                return e.username == "Delphine";
            });
            console.log(body.id);
            let idValue = body.id;
            cy.wrap(body.id).as('userId')
        })

    })

    it('get posts and validate comments' ,function () {
       // console.log(idValue);
        cy.request({
            url:'/posts',
            qs: {
                userId:this.userId,
                },
            })
        .then(function (response)  {
            expect(response.status).to.eq(200);
            expect(response).to.have.property('headers')
            expect(response).to.have.property('duration')
            cy.writeFile('cypress/fixtures/posts.json',response.body);
       
        });
    });    

    it('get comments from each',function () {
      

        cy.fixture('posts').then((posts) => {
           
           cy.log(posts);
                for (var i of posts){    
                    console.log(i.id);
                    cy.request('/comments?postId='+i.id)
                    .then((commentResponse) => {
                        //console.log(commentResponse.body)
                        var commentsCount = Object.keys(commentResponse.body).length;
                        console.log(commentsCount);
                        for(var x=0;x<commentsCount;x++){
                          //  console.log(commentResponse.body[x].email);
                          cy.validateEmail(commentResponse.body[x].email)
                          .then((emailValidationResponse) => {
                                expect(emailValidationResponse).to.be.true;
                            });
                           // expect(validateEmail(commentResponse.body[x].email)).to.be.true;
                           // var returnEmail = validateEmail(commentResponse.body[x].email);
                            // if(returnEmail == true)
                            //     console.log("Email Address "+ commentResponse.body[x].email + "is of Valid format");
                            //  else{
                            //      console.log("Email Address "+ commentResponse.body[x].email + "is of NOT Valid format");
                            //  }   
                    }           
                });
             }

        }) 


    //    var length = Object.keys(this.postCount).length;
    //         for (var i=0;i<length;i++){
    //             cy.request('/comments?postID='+this.postCount[i])
    //             .then((commentResponse) => {
    //                 var commentsCount = Object.keys(commentResponse.body).length;
    //                     for(var x=0;x<commentsCount;x++){
    //                         console.log(commentResponse.body[x].email);
    //                         var returnEmail = validateEmail(commentResponse.body[x].email);
    //                         if(returnEmail == true)
    //                            console.log("Email Address "+ commentResponse.body[x].email + "is of Valid format");
    //                     }           
    //             })
    //         }

        });
        

    
        
            
    
});

