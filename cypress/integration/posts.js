/// <reference types = "cypress"/>

context('tests for checking comments ', () => {

    let idValue

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


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
            idValue = body.id;


             
        })

    })

    it('get posts' ,() =>{
        console.log(idValue);
        cy.request({
            url:'/posts',
            qs: {
                userId:idValue,
                },
            })
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response).to.have.property('headers')
            expect(response).to.have.property('duration')

            var length = Object.keys(response.body).length;
            var array = [];
            var i;
            for ( i = 0; i<length; i++){
                array.push(response.body[i].id);
            }
            console.log(array)
            for (i=0;i<length;i++){
                cy.request('/comments?postID='+array[i])
                .then((commentResponse) => {
                    var commentsCount = Object.keys(commentResponse.body).length;
                    var x;
                    for(x=0;x<commentsCount;x++){
                         console.log(commentResponse.body[x].email);
                            var returnEmail = validateEmail(commentResponse.body[x].email);
                            if(returnEmail == true)
                               console.log("Email Address "+ commentResponse.body[x].email + "is of Valid format");
            }           
                })
            }
            





         });
    });
});