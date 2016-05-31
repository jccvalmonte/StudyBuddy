db = db.getSiblingDB('studybuddy')
db.createCollection('accounts')
Accounts = db.getCollection("accounts")
Accounts.remove({})
Accounts.insert(
{
"email": "dipali@gmail.com",
"firstName": "Dipali",
"lastName": "Vagal",
"dob": "10/19/1987",
"username": "user1",
"password": "dipali",
"hashed_pwd": "q/paLCaN5zlOth/yf7GtevIUOqKbspJsu2kKpmLzLrM=",
}
)
Accounts.insert(
{
"email": "anthony@gmail.com",
"firstName": "Anthony",
"lastName": "Absher",
"dob": "11/09/1998",
"username": "user2",
"password": "anthony",
"hashed_pwd": "UCkTv91J6rVkKC3/EB5tFnMhI37uxm7tsqQ47YD96qA="
}
)

user1 = Accounts.findOne({username: 'user1'})
user1Id = user1._id.valueOf();
user2 = Accounts.findOne({username: 'user2'})
user2Id = user2._id.valueOf();

db.createCollection('sets')
Sets = db.getCollection("sets")
Sets.remove({})
Sets.insert(
{
"setIdNum": "1",
"Name": "Beginners Math",
"Category": "Mathematics",
"numCards": "3",
"Author": user1Id,
"DateCreated": "04-29-2016",
"email":"dipali@gmail.com"
}
)

Sets.insert(
{
"setIdNum": "2",
"Name": "Advanced Math",
"Category": "Mathematics",
"numCards": "2",
"Author": user1Id,
"DateCreated": "04-29-2016",
"email":"dipali@gmail.com"
}
)
Sets.insert(
{
"setIdNum": "3",
"Name": "Chemistry",
"Category": "Science",
"numCards": "5",
"Author": user2Id,
"DateCreated": "04-29-2016",
"email":"anthony@gmail.com"
}
)
Sets.insert(
{
"setIdNum": "4",
"Name": "Vocabulary",
"Category": "English",
"numCards": "6",
"Author": user2Id,
"DateCreated": "04-29-2016",
"email":"anthony@gmail.com"
}
)

db.createCollection('cards')
Cards = db.getCollection("cards")
Cards.remove({})
Cards.insert(
{
"setIdNum": "1",
"Author": user1Id,
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

Cards.insert(
{
"setIdNum": "2",
"Author": user1Id,
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

Cards.insert(
{
"setIdNum": "3",
"Author": user2Id,
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

Cards.insert(
{
"setIdNum": "4",
"Author": user2Id,
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