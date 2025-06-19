import { productFilter } from '../scripts/filters/productFilter'; // Adjust the import path as needed
import { getProductsFromApi } from '../scripts/api/getProductsFromApi'; // Adjust the import path as needed

// Mock the API function
jest.mock('../scripts/api/getProductsFromApi', () => ({
    getProductsFromApi: jest.fn()
}));

describe('productFilter', () => {
    beforeEach(() => {
        // Create the actual buttons in a mock DOM
        document.body.innerHTML = `
            <section id="categories">
                <button id="allproducts">ALL PRODUCTS</button>
                <button id="women's%20clothing">WOMEN'S CLOTHING</button>
                <button id="men's%20clothing">MEN'S CLOTHING</button>
                <button id="jewelery">JEWELERY</button>
                <button id="electronics">ELECTRONICS</button>
            </section>
        `;

        // Clear mocks
        jest.clearAllMocks();
    });

    test('adds click event listeners to all category buttons', () => {
        productFilter();

        const expectedIds = [
            'allproducts', 
            "women's%20clothing", 
            "men's%20clothing", 
            'jewelery', 
            'electronics'
        ];

        expectedIds.forEach(id => {
            const button = document.getElementById(id);
            expect(button).toBeTruthy();
        });
    });

    test('calls getProductsFromApi when "allproducts" button is clicked', () => {
        productFilter();

        // Find the "allproducts" button and trigger its click event
        const allProductsButton = document.getElementById('allproducts');
        allProductsButton.click();

        // Verify getProductsFromApi was called
        expect(getProductsFromApi).toHaveBeenCalled();
    });

    test('calls getProductsFromApi when any category button is clicked', () => {
        // Test each category button
        const categoryTests = [
            "women's%20clothing", 
            "men's%20clothing", 
            'jewelery', 
            'electronics'
        ];

        productFilter();

        categoryTests.forEach((buttonId) => {
            // Reset the mock before each test
            getProductsFromApi.mockClear();

            // Find the specific category button and trigger its click event
            const categoryButton = document.getElementById(buttonId);
            categoryButton.click();

            // Verify getProductsFromApi was called
            expect(getProductsFromApi).toHaveBeenCalled();
        });
    });
});