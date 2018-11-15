describe('Product Details',()=>{
    let productDetails

    beforeEach(() => {
       productDetails = new mc_app.ProductDetailsModel();
      });
     it('Should set default parameters like title and imageURL to empty string,where as colorChoices,sizeChoices and quantity to an empty array',()=>{
        expect(productDetails.get('title')).toBe('');
        expect(productDetails.get('imageURL')).toBe('');
        expect(productDetails.get('colorChoices')).toEqual([]);
        expect(productDetails.get('sizeChoices')).toEqual([]);
        expect(productDetails.get('quantity')).toEqual([]);
     });
     it('Sould be invalid without setting parameters',()=>{
         expect( productDetails.isValid()).toBeFalsy();
     })
     describe('Validation for Product Details ', () => {
         beforeEach(()=>{
            productDetails.set({
                title: 'Nice dress for all ocassions !',
                imageURL: 'https://demo.themeum.com/wordpress/winkel/wp-content/uploads/2017/08/product-img27.jpg',
                colorChoices: ['Red', 'Yellow', 'Pink'],
                sizeChoices: [{
                    value: '2S',
                    text: 'Small'
                  },
                  {
                    value: '3M',
                    text: 'Medium'
                  },
                  {
                    value: '4L',
                    text: 'Large'
                  }
                ],
                quantity: [1, 2, 3, 4, 5]
             });
             
         });
         it('Sould be valid after setting  proper parameters',()=>{
            expect(productDetails.isValid()).toBeTruthy();
        });
       
    });
   
          
});

describe('Shipping Address Details',()=>{
    

});


