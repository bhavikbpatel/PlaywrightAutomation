# Created by: Bhavik Patel
Feature: Ecommerce Validations
    @Regression
    Scenario Outline: Placing the Order
        Given a login to ecommerce application with "<username>" and "<password>"
        When Add "<product>" to the cart
        Then Verify that "<product>" is displayed in the cart
        When Enter valid details and Place Order
        Then Verify order is present in the OrderHistory

        Examples:
            | username          | password    | product         |
            | anshika@gmail.com | Iamking@000 | ADIDAS ORIGINAL |

    @Validations
    Scenario Outline: Placing the Order parallel
        Given a login to ecommerce2 application with "<username>" and "<password>"
        Then Verify Error message is displayed

        Examples:
            | username          | password  |
            | rahulshetty       | learning  |
            | anshika@gmail.com | Iamking@1 |