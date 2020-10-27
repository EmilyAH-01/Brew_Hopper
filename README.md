# Brew_Hopper

This project was designed as a homework assignment for MSU's coding bootcamp. 

This application was created to emphasize the use of HTML, CSS , jQuery & ajax. Also, this project was introduced the class to how to work in a team enviroment and how to use create branches and submit branches back into the master file without causing breaks in the program.

This project has been deployed to to Emily Herman's Personal GitHub Page. To get this project up and running, you can follow the deployment links that have been included in the Link Section below.

# Table of Contents
1. [Links](#Links)
2. [Project Overview](#projectoverview)
3. [Assignment](#Assignment)
4. [Project Requirements](#projectrequirements)
5. [Project Requirements](#projectrequirements)
6. [Scripted Features](#scriptedfeatures)
7. [Execution](Execution)
8. [Contains](#Contains)
9. [Creators](#Creators)


## Links

* [GitHub Repository](https://github.com/EmilyAH-01/Brew_Hopper)
* [Deployed GitHub IO](https://emilyah-01.github.io/Brew_Hopper) 

## Project Overview <a name="projectoverview"></a>

* HTML, Foundation CSS, jQuery and Multiple APIs were used to create a application that allows the user to either let the site access their location or enter their city in the input field (under development) and hitting enter. The user can choose the radius they would like to set to pull up the local breweries in that specific radius.  

## Assignment
### This assignment contains the following features: 
* The Initial Opening Page
    <details>
        <summary>Click to expand</summary>

    - Only contains the Main Header, overall map and the Location Search Input Page  
    
    *Opening Page*![Opening Page](https://github.com/EmilyAH-01/Brew_Hopper/blob/main/screenshots/OpeningPage.png)
    
    - Asks the user for permission to get location

    *Permission for Location*![Permission](https://github.com/EmilyAH-01/Brew_Hopper/blob/main/screenshots/PermissionRequest.png)

    </details>

* The Result Page
    <details>
        <summary>Click to expand</summary>

    - Gives a list of all the local breweries along with their information
    - Allows user to add the items to the map and calculate a route to the different locations 
    
    *Initial Results*![Initial Results](https://github.com/EmilyAH-01/Brew_Hopper/blob/main/screenshots/ListShowing.png)
    
    - Displays the location of the locale breweries on the map

    *Brewery Location Added*![AddBrewery](https://github.com/EmilyAH-01/Brew_Hopper/blob/main/screenshots/ItemAdded.png)

    - Shows the best route between the different locations

    *Route Layout*![Route](https://github.com/EmilyAH-01/Brew_Hopper/blob/main/screenshots/Route.png)
    </details>

## Project Requirements: <a name="projectrequirements"></a>
<details>
    <summary>Click to expand</summary>

* Must use at least two server-side APIs

* Must use a CSS framework _other than_ Bootstrap

* Must be interactive (i.e: accept and respond to user input)

* Use at least one new third-party API

* Must have a polished UI

* Must meet good quality coding standards

* Does not use alerts, confirms or prompts (look into _modals_)

* Must be deployed to GitHub Pages

</details>

## Presentation Requirements: <a name="presentationrequirements"></a>
<details>
    <summary>Click to expand</summary>

Use this [project presentation template](https://docs.google.com/presentation/d/1_u8TKy5zW5UlrVQVnyDEZ0unGI2tjQPDEpA0FNuBKAw/edit?usp=sharing) to address the following: 

* Elevator pitch: a one minute description of your application

* Concept: What is your user story? What was your motivation for development?

* Process: What were the technologies used? How were tasks and roles broken down and assigned? What challenges did you encounter? What were your successes?

* Demo: Show your stuff!

* Directions for Future Development

* Links to the deployed application and the GitHub repository

</details>

## Scripted Features <a name="scriptedfeatures"></a>
### This project has several scripted features of:
<details>
    <summary>Click to expand</summary>

* Event listener (onclick) to allow the user to give permission to access their location and get their latitude and longitue.
* An array & forEach loop with a function that generates all the card bodies for the individual breweries in that area and their information and website.
* Functions that use ajax & get to pull specific information for the map, breweries, and city information needed to generate the results.
* Function that uses the current date, with for loop and ajax which pulls forecast data for the next five days and places each day data into its respective specific individual forecastCard.
* a document.ready funtion that pulls data from local storage and shows the last searched city's weather conditions and creates the previous search list when site is opened. 
* Event listener  & functions to get information based on location and distance (radius) for the search button. It will then generate the map, location and list of the locale breweries.


</details>

## Execution
### To Execute File:
> Open in browser by way of Deployed IO link

## Contains: 
* One HTML Page
    * Index.html 

* One CSS Page
    * Styles.css
        * Contains styling for html user input features
        
* One Javascript Pages
    * brewery.js
        * Contains:
            * forEach Loop
            * Variables
            * Arrays

* Three APIs
    * OpenBrewery - [Website](https://www.openbrewerydb.org/)
    * Here - [Website](https://www.here.com/)
    * LocationIQ - [Website](https://locationiq.com/)

## Creators:

* **Jeff Clegg** - [Git Hub Profile](https://github.com/JC72)
* **Emily Herman** - [Git Hub Profile](https://github.com/EmilyAH-01)
* **Andy Dolen** - [Git Hub Profile](https://github.com/dolenand)
* **Christian Marcano** - [Git Hub Profile](https://github.com/Cmarcano7)
* **Garian Cook** - [Git Hub Profile]()
* **
* MSU BootCamp