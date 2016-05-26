db = db.getSiblingDB('studybuddy')
db.createCollection('sets')
CardLists = db.getCollection("sets")
CardLists.remove({})
CardLists.insert(
{
"SetIdNum": "1",
"Name": "Beginners Math",
"Category": "Mathematics",
"numCards": "3",
"Author": "A",
"DateCreated": "04-29-2016",
"email":"dipali@gmail.com"
}
)

CardLists.insert(
{
"SetIdNum": "2",
"Name": "Advanced Math",
"Category": "Mathematics",
"numCards": "2",
"Author": "B",
"DateCreated": "04-29-2016",
"email":"dipali@gmail.com"
}
)
CardLists.insert(
{
"SetIdNum": "3",
"Name": "Chemistry",
"Category": "Science",
"numCards": "5",
"Author": "C",
"DateCreated": "04-29-2016",
"email":"dipali@gmail.com"
}
)
CardLists.insert(
{
"SetIdNum": "4",
"Name": "Vocabulary",
"Category": "English",
"numCards": "6",
"Author": "D",
"DateCreated": "04-29-2016",
"email":"dipali@gmail.com"
}
)
CardLists.insert(
{
"SetIdNum": "5",
"Name": "Vocabulario",
"Category": "Spanish",
"numCards": "2",
"Author": "E",
"DateCreated": "04-29-2016",
"email":"dipali@gmail.com"
}
)
CardLists.insert(
{
"SetIdNum": "6",
"Name": "Astrology",
"Category": "Science",
"numCards": "1",
"Author": "F",
"DateCreated": "04-29-2016",
"email":"dipali@gmail.com"
}
)
db.createCollection('cards')
CardCollection = db.getCollection("cards")
CardCollection.remove({})
CardCollection.insert(
{
"setIdNum": "1",
"cards": [
{
"cardId": "1",
"front": "1+1",
"back": "2"
},
{
"cardId": "2",
"front": "10-1",
"back": "9"
},
{
"cardId": "3",
"front": "3*2",
"back": "6"
}
]
}
)

CardCollection.insert(
{
"setIdNum": "2",
"cards": [
{
"cardId": "1",
"front": "3^4",
"back": "81"
},
{
"cardId": "2",
"front": "Sqrt(144)",
"back": "12"
}
]
}
)

CardCollection.insert(
{
"setIdNum": "3",
"cards": [
{
"cardId": "1",
"front": "Na",
"back": "Sodium"
},
{
"cardId": "2",
"front": "Fe",
"back": "Iron"
},
{
"cardId": "3",
"front": "He",
"back": "Helium"
},
{
"cardId": "4",
"front": "Hg",
"back": "Mercury"
},
{
"cardId": "5",
"front": "Ag",
"back": "Silver"
}
]
}
)

CardCollection.insert(
{
"setIdNum": "4",
"cards": [
{
"cardId": "1",
"front": "Woodnote",
"back": "A wild or natural musical tone"
},
{
"cardId": "2",
"front": "Gonzo",
"back": "Filled with bizarre or subjective ideas"
},
{
"cardId": "3",
"front": "Amanuensis",
"back": "A person employed to write what another dictates"
},
{
"cardId": "4",
"front": "Puckish",
"back": "Mischievous, impish"
},
{
"cardId": "5",
"front": "Flivver",
"back": "An automobile, especially one that is small, inexpensive, and old"
},
{
"cardId": "6",
"front": "Alfresco",
"back": "in the open air"
}
]
}
)

CardCollection.insert(
{
"setIdNum": "5",
"cards": [
{
"cardId": "1",
"front": "Hola",
"back": "Hello"
},
{
"cardId": "2",
"front": "Pantalones",
"back": "Pants"
}
]
}
)

CardCollection.insert(
{
"setIdNum": "6",
"cards": [
{
"cardId": "1",
"front": "The planet we live on",
"back": "Earth"
}
]
}
)
