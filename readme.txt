OpenINV Inventory Management API

The goal of this project is to create an open-source inventory management
Restful API that can be used with a variety of devices.

In its current state, it can add and remove items using arguments from a
GET querystring.


Example API request-

  curl 'http://server.info:8081/?action=add&type=item&item=test&value=10&quantity=1&security_token=8e5d690d330e803b7bb9f5a4054a8845be0af22cf1914956897d17fcaf26616f'

  Action:   Either add or remove

  Type:     Has no meaning yet. Just use item for now.

  Item:     Name of the item being added

  Value:    Monetary value of the item

  Quantity: How many to add/remove



Security-
  OpenINV currently uses a SHA256 hash for it's security tokens.
  The formula is sha256(private_token + item) where private_token is
  provided through the "-t" argument when starting the server, and item is
  the "item" parameter supplied through the GET request.
  When a security token is either incorrect or not provided, no information
  will be written to the database.
