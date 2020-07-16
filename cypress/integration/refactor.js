/// <reference types = "cypress"/>

context('API Tests for Checking Format of Email in comments on Posts', () => {

    it('get user details', () => {
        cy.request('/users')
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response).to.have.property('headers')
            expect(response).to.have.property('duration')
            expect(response.body[0]).property('id').to.be.a('number');

            const userDetails = response.body.find(function(e){
                return e.username == "Delphine";
            });
           // expect(userDetails).to.be.true;
            cy.wrap(userDetails.id).as('userId')
        })

    })

    it('get All posts of particular userid' ,function () {
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

    it('get comments from each post and Validate Email Address',function () {
      

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

