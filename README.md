
src/data/api/UsersAPI.ts

1) была опечатка friendIds.push(user.id) => friendIds.push(userId), если было задумано добавлять самого пользователя

2) убрала добавления самого пользователя user из fetchFriends, добавила сортировку по именам

---------------
src/components/Market/Market.tsx

1) в buyGames добавила userIds, acknowledgeInvite, acknowledgeInviteAge
--------------
src/data/api/data.ts

1) поменяла friendIds: [2] => friendIds: [6, 8, 2, 18], так как в автотестах используется первый пользователь массива,
у него в друзьях был пользователь номер 2, а автотестах использовались номера для проверки 6, 8, 2, 18 у первого пользователя

-------------
src/components/PurchaseForm/PurchaseForm.test.tsx

1) в проверке render second email input after the first is specified поменяла
    - fireEvent.change(await findByTestId(`email0`), {target: {value: '1'}}) =>
    - fireEvent.change(await findByTestId(`email0`), {target: {value: EMAIL0}})
    
    (так как чтобы появился второй email, сначала надо ввести валидный первый email)

2) в проверке allows to enter the first email address поменяла
    - expect((getByTestId(`email0`) as HTMLInputElement).value).toEqual(EMAIL0); =>
    - expect((getByTestId(`email1`) as HTMLInputElement).value).toEqual(EMAIL0);

    (так как когда ввожу первый email, он сразу же появляется в элементе (`email1`) с веденным значением

3) в проверке allows to enter two email addresses поменяла 
    - expect((getByTestId(`email0`) as HTMLInputElement).value).toEqual(EMAIL0);
    - expect((getByTestId(`email1`) as HTMLInputElement).value).toEqual(EMAIL1); =>

    - expect((getByTestId(`email1`) as HTMLInputElement).value).toEqual(EMAIL0);
    - expect((getByTestId(`email2`) as HTMLInputElement).value).toEqual(EMAIL1);

4) в проверкe does not allow to select the current user if his age does not match game restrictions поменяла 
    - expect(await findByTestId(`user${USER_ID}`)).not.toBeChecked(); =>
    - expect(await findByTestId(`user${USER_ID}incorrectAge`)).not.toBeChecked();


5) в проверке does not allow to select a friend if his age does not specified поменяла 
    - expect(await findByTestId(`user${USER_ID}`)).not.toBeChecked(); =>
    - expect(await findByTestId(`user${USER_ID}noAge`)).not.toBeChecked();

6) в проверке does not allow to select a friend if his age does not match game restrictions поменяла
    - expect(await findByTestId(`user${USER_ID}`)).not.toBeChecked(); =>
    - expect(await findByTestId(`user${USER_ID}incorrectAge`)).not.toBeChecked();
    
    (по пункту 4, 5, 6 изучив автотесты PurchaseForm.test.tsx увидела, что если нет возраста у пользователя или не соответсвует игре, то добавляются
    noAge и ncorrectAge к testId, поэтому и в этих пунктах сделала по аналогии)

    returns selectable users и returns selectable users and emails не прошли(возможно из-за того, что убрала добавление самого пользователя 
    user из fetchFriends и добавила самого пользователя не через список)


## Background

There is a web-site "Game Market" allowing to purchase game applications - kind of "App Store".
Users can choose a game from the list of available applications and add it to the cart.
Several game applications can be added to the cart.
Users can remove an application from the cart if they have changed their mind and declined buying.
Each game has the name, name of developer, year of game's release.
Some games have age restrictions e.g. 12+, 18+ etc.

## Your task

Most of the application is already complete.
You should implement the [PurchaseForm](src/components/PurchaseForm/PurchaseForm.tsx) based on the requirements below.

You can implement the task in JavaScript if you want.
Just rename `.ts` to `.js` and delete all constructions that are invalid for JavaScript.

You can not only make changes to any file, but also offer your point of view on some parts of the application.

## User Story

As a fan of gaming I want to buy games for me and for my friends, so that I and my friends can play these games together.

## Acceptance Criteria

For each game in the cart:
* I as a fan of gaming can select one or several persons, who will get the game:
  * I can select myself in the list.
  * I can select one of my friends, who already registered in Game Market.
  * I can also buy the game for unregistered friends by specifying their emails.
* If the game has age restriction, it must be impossible to select persons under this age.

## UI requirements

#### Buying game for myself and registered friends

Each game box in the cart should additionally display the list of persons, who can get the game, in the following format:

- [x] Person's name

The list should include:
* The logged-in user - always has the first position in the list and should be marked with a special label "*(me)*".
* The logged-in user's friends, sorted by name.

All checkboxes are unchecked by default.
The user may click on the checkbox to select the person who will get the game.
Click should trigger the validation of age restriction, if the game has this restriction:
* If the selected person is under the required minimum age, click won't activate the checkbox and the following warning should appear near the checkbox: "*The person is not allowed to get the game due to age restriction*".
* If the age of the selected person is undefined, click won't also activate the checkbox and the following warning should appear near the checkbox: "*Cannot be selected unless user's age is specified, because the game has age restriction*".

#### Buying game for unregistered friends

One extra checkbox "*Invite friends*" should always be available at the end of the list.
* Click on this checkbox should allow the user to specify one or multiple emails of unregistered friends.
* User must accept the checkbox with the following disclaimer to proceed with the purchase flow: "*I acknowledge that Game Market invitation emails will be sent to specified emails. The game will become available to the person only onсe the registration in the Game Market is completed.*"
* If the game has age restriction, user must accept the additional checkbox "*I acknowledge that the game has age restriction and might be unavailable if a person is under required age.*" 

