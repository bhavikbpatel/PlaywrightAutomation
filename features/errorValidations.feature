Feature: Ecommerce Validations
@Validations
    Scenario Outline: Placing the Order
        Given a login to ecommerce2 application with "<username>" and "<password>"
        Then Verify Error message is displayed

Examples:
            | username          | password         |
            | rahulshetty       | learning         |
            | anshika@gmail.com | Iamking@1        |