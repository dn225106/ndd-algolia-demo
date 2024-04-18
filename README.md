# Algolia Search UI Demo Project

This React application serves as a demo project to showcase my understanding of Algolia's features. The project aims to demonstrate how Algolia can be integrated into a React application to provide efficient search and filtering functionalities in an eCommerce setting. I wanted to implement as many widgets and capabilities as possible available through Algolia InstantSearch to demonstrate understanding of Algolia technology from the perspective of a client or integrator.

## Project Overview

- **Search Implementation**: The project integrates Algolia's search functionality to enable users to search for products or other data with ease.
- **Faceted Search**: Utilizing Algolia's faceted search capabilities, users can filter search results based on different attributes such as category, price range, ratings, hierarchical categories, and free shipping.
- **Instant Search Results**: Search results are displayed instantly as users type in the search bar, providing a seamless and responsive search experience.
- **Pagination**: The application efficiently handles large sets of search results by implementing pagination.
- **Edit Pagination**: The application also allows you to control how many items should appear on a given page.
- **List and Grid View**: Users can select between viewing query results in a list or grid format, providing a customizable search experience.
- **Sorting**: Users can sort search results based on relevance, popularity, and price ascending/descending, enhancing the user experience.
- **Shopping Cart/Favorites**: This application mimics a real eCommerce website by having a working Shopping Cart feature as well as a favorite button.

## Project Goals

My primary goals with this demo project are:

1. **Demonstrate Understanding**: Showcase my understanding of Algolia's basic features and how they can be integrated into a React application.
2. **Provide Practical Examples**: Offer practical examples of how Algolia's features can enhance the search and discovery experience within an application.
3. **Showcase Coding Proficiency**: Highlight my coding proficiency in React and ability to integrate with third-party tools.
4. **Receive Feedback**: Seek feedback from the Algolia team on the implementation, usability, and potential improvements of the demo project.

## Installation and Setup

To run this demo project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/algolia-demo.git

2. Navigate to the project directory:

    ```bash
    cd ndd-algolia-demo/

3. Install dependencies:

    ```bash
    npm install

4. Start the development server

    ```bash
    npm start

5. Open http://localhost:3000 to view on your browser


## Project Feedback

I really enjoyed the open-ended nature of this project, since it allowed me to see Algolia's features first-hand from the perspective of a potential integrator. It was very enjoyable to work on this project, and most of the Algolia features were easy and painless to implement through the InstantSearch library. The only negative part I experienced was working with the dataset, as it was hard to pick out a dataset that would work fully for all the features I wanted to implement. For example, in the eCommerce dataset I used, two pricing attributes existed (salePrice and price) that would make implementing the range slider more difficult without modifying the dataset. Another example would be the lack of images and image sizing for some items in the index led to a less-than-desirable display for the user due to image resizing.