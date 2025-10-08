"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Character, Species, Planet
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/character', methods=["POST"])
def add_new_character():
    body = request.json     # getting (requesting) info from front end

    new_character = Character()     # declaring a new character variable which will be equal to the Character in models.py (Character structure in models.py)
    new_character.name = body["name"]
    new_character.hair_color = body["hair_color"]
    new_character.eye_color = body["eye_color"]
    new_character.homeworld_id = int(body["homeworld_id"])
    new_character.species_id = int(body["species_id"])

    db.session.add(new_character)   # getting to saving point
    db.session.commit()     # saves it

    return jsonify(new_character.serialize())       #new_character is originally a python object, .serialize turns this object into a dictionary because you cannot jsonify a python object


@api.route('/species', methods=["POST"])
def add_new_species():
    body = request.json
    new_species = Species()
    new_species.name = body["name"]
    new_species.average_height = int(body["average_height"])
    new_species.average_lifespan = int(body["average_lifespan"])
    new_species.language = body["language"]

    db.session.add(new_species)
    db.session.commit()

    return jsonify(new_species.serialize())


@api.route('/planet', methods=["POST"])
def add_new_planet():
    body = request.json
    new_planet = Planet()
    new_planet.name = body["name"]
    new_planet.population = int(body["population"])
    
    db.session.add(new_planet)
    db.session.commit()

    return jsonify(new_planet.serialize())


@api.route('/planets', methods=["GET"])
def get_all_planets():
    planets = Planet.query.all()        # we're grabing a list of all planets from our database, they start out as planet objects
    planets_serialized = [planet.serialize() for planet in planets]     # the planets inside the list are still objects and we're turning them into a dictionary
    return jsonify(planets_serialized)      # we jsonify the new list that is a list of planet dictionaries

@api.route('/characters', methods=["GET"])
def get_all_characters():
    characters = Character.query.all()
    characters_serialized = [character.serialize() for character in characters]
    return jsonify(characters_serialized)

@api.route('/species', methods=["GET"])
def get_all_species():
    species = Species.query.all()
    species_serialized = [species.serialize() for species in species]
    return jsonify(species_serialized)


@api.route('/characters/<int:character_id>', methods=["GET"])
def get_single_character(character_id):
    character = Character.query.get(character_id)
    return jsonify(character.serialize())

@api.route('/characters/<int:character_id>', methods=["PUT"])
def edit_single_character(character_id):
    edited_character = Character.query.get(character_id)
    body = request.json

    if "name" in body:
        edited_character.name = body["name"]
    if "hair_color" in body:
        edited_character.hair_color = body["hair_color"]
    if "eye_color" in body: 
        edited_character.eye_color = body["eye_color"]
    if "homeworld_id" in body:
        edited_character.homeworld_id = body["homeworld_id"]
    if "species_id" in body:
        edited_character.species_id = body["species_id"]
    
    db.session.commit()

    return jsonify(edited_character.serialize())



@api.route('/species/<int:species_id>', methods=["GET"])
def get_single_species(species_id):
    species = Species.query.get(species_id)
    return jsonify(species.serialize())

@api.route('/species/<int:species_id>', methods=["PUT"])
def edit_single_species(species_id):
    edited_species = Species.query.get(species_id)
    body = request.json

    if "name" in body:
        edited_species.name = body["name"]
    if "average_height" in body:
        edited_species.average_height = body["average_height"]
    if "average_lifespan" in body:
        edited_species.average_lifespan = body["average_lifespan"]
    if "language" in body:
        edited_species.language = body["language"]

    db.session.commit()

    return jsonify(edited_species.serialize())

@api.route('/planets/<int:planet_id>', methods=["GET"]) # Taking information (planet_id)
def get_single_planet(planet_id):
    planet = Planet.query.get(planet_id) # Using that information (find which planet the user wants to see by using the planet_id)
    return jsonify(planet.serialize()) # Giving back what information is requested (we return that planet back to the user)

@api.route('/planets/<int:planet_id>', methods=["PUT"])
def edit_single_planet(planet_id):
    edited_planet = Planet.query.get(planet_id)
    body = request.json
    
    if "name" in body:
        edited_planet.name = body["name"]
    if "population" in body:
        edited_planet.population = body["population"]

    db.session.commit()

    return jsonify(edited_planet.serialize())


@api.route('/signup', methods=["POST"])
def create_new_user():
    body = request.json
    new_user = User() 
    new_user.email = body["email"]
    new_user.password = body["password"]
    new_user.is_active = True

    if new_user.email is None and new_user.password is None:
        return jsonify({"msg": "email and password are required"}), 400
    if new_user.email is None:
        return jsonify({"msg": "email is required"}), 400
    if new_user.password is None:
        return jsonify({"msg": "password is required"}), 400

    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.serialize())

@api.route('/login', methods=["POST"])
def log_in_user():
    body = request.json
    user = User.query.filter_by(email=body["email"], password=body["password"]).first()
    if user is None:
        return jsonify({"msg": "user not found / invalid credentials"}), 401
    access_token = create_access_token(identity=str(user.id))           # this line is encrypting the user id into a token see around line 292
    return jsonify({"user": user.serialize(), "token": access_token})


@api.route('user/<int:user_id>', methods=["GET"])
def get_single_user(user_id):
    user = User.query.get(user_id)
    return jsonify(user.serialize())



@api.route('/user/<int:user_id>/favorites/characters/<int:character_id>', methods=["POST"])
def add_user_favorite_characters(user_id, character_id):

    user = User.query.get(user_id)
    character = Character.query.get(character_id)

    user.favorite_characters.append(character)
    db.session.commit()

    return jsonify({"favorite_characters": [element.serialize() for element in user.favorite_characters]})
    

@api.route('user/favorites/planets', methods=["POST"])
def add_user_favorite_planets():
    body = request.json
    user_id = body["user_id"]
    planet_id = body["planet_id"]

    user = User.query.get(user_id)
    planet = Planet.query.get(planet_id)

    user.favorite_planets.append(planet)
    db.session.commit()

    return jsonify({"favorite_planets": [element.serialize() for element in user.favorite_planets]})


@api.route('/user/favorites/species', methods=["POST"])
def add_user_favorite_species():
    body = request.json
    user_id = body["user_id"]
    species_id = body["species_id"]

    user = User.query.get(user_id)
    species = Species.query.get(species_id)

    user.favorire_species.append(species)
    db.session.commit()

    return jsonify({"favorite_species": [element.serialize() for element in user.favorite_species]})


@api.route('/user/favorites/characters', methods=["DELETE"])
def remove_favorite_character():
    body = request.json
    user_id = body["user_id"]
    character_id = body["character_id"]

    if body["character_id"] is None:
        return jsonify({"msg": "character_id is required"}), 400

    user = User.query.get(user_id)
    character = Character.query.get(character_id)

    if character is None:
        return jsonify({"msg": "character was not found"}), 404

    user.favorite_characters.remove(character)
    db.session.commit()

    return jsonify({"favorite_characters": [element.serialize() for element in user.favorite_characters]})


@api.route('/user/favorites/species', methods=["DELETE"])
def remove_favorite_species():
    body = request.json
    user_id = body["user_id"]
    species_id = body["species_id"]

    user = User.query.get(user_id)
    species = Species.query.get(species_id)

    user.favorite_species.remove(species)
    db.session.commit()

    return jsonify({"favorite_species": [element.serialize() for element in user.favorite_species]})

@api.route('/user/favorites/planets', methods=["DELETE"])
def remove_favorite_planets():
    body = request.json
    user_id = body["user_id"]
    planet_id = body["planet_id"]

    user = User.query.get(user_id)
    planet = Planet.query.get(planet_id)

    user.favorite_planets.remove(planet)
    db.session.commit()

    return jsonify({"favorite_planets": [element.serialize() for element in user.favorite_planets]})

@api.route('/private', methods=["GET"])
@jwt_required()
def token_user_logged():
    id = get_jwt_identity()         # this line is decrypting the user id from the token see around line 187
    print(id)
    user = User.query.get(int(id))       # this line is finding the user by the ID
    return jsonify(user.serialize()), 200    

