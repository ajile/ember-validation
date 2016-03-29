...
// Создание экземпляра класса пользователя, в этот момент происходит создание
// требуемых объектов, по схеме, для валидации объекта.
const user = User.create();

var promise;

promise = user.validate();
promise.then(() => console.log("Unreachable"));
promise.catch(() => console.log("User is invalid", user.get("errors")));

user.set("username", "ajile");

promise = user.validate();
promise.then(() => console.log("User is valid"));
promise.catch(() => console.log("Unreachable", user.get("errors")));
...
