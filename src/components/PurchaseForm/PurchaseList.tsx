import React, {useContext, useState, useEffect} from 'react';
import {CheckboxList, CheckedUser, AkkauntUser, Checked, Email} from '../../data/types';
import {APIContext} from "../Context";
import {Loading} from "../Common/Loading";
import {Checkbox} from '../Common/Checkbox';
import {TextInput} from '../Common/TextInput';
import {EMAIL_REGEX} from '../../data/constants';

export function PurchaseList({id, value, onChange, ageAkkaunt}: CheckboxList) {
    const minAge = value.game.restrictions?.minAge !== undefined ? value.game.restrictions?.minAge : -1;

    const api = useContext(APIContext);
    const [checkedUsers, setCheckedUsers] = useState<CheckedUser[]>();

    useEffect( () => {
        api.users.fetchFriends({userId: id}).then((friends) => {
            setCheckedUsers(friends.map((friend) => ({user: friend, id: friend.id, checked: false, disabled: false})));
        });
    }, [api]);

    // user
    const [user, setUser] = useState<AkkauntUser>({name: `(me)`, age: ageAkkaunt, id: id, checked: false, disabled: false});
    const setUserChange = (valueChecked: boolean, valueDisabled: boolean) => {
        if(minAge !== -1 && user.age === -1) {
            setUser({name: `(me)`, age: ageAkkaunt, id: id, checked: false, disabled: valueDisabled});
        } else if(minAge !== -1 && user.age < minAge) {
            setUser({name: `(me)`, age: ageAkkaunt, id: id, checked: false, disabled: valueDisabled});
        } else {
            if (valueChecked) {
                setUser({name: `(me)`, age: ageAkkaunt, id: id, checked: true, disabled: false});
                value.userIds === undefined ? value.userIds = [user.id] : value.userIds.push(user.id);
                onChange(value);
            } else {
                setUser({name: `(me)`, age: ageAkkaunt, id: id, checked: false, disabled: false});
                value.userIds === undefined ? value.userIds = [] : value.userIds = value.userIds.filter(item => item !== user.id);
                onChange(value);
            }
        }
    }

    // Friends
    const setFriendChange = (valueChecked: boolean, valueDisabled: boolean, currentId: number | undefined) => {
        setCheckedUsers(checkedUsers?.map(checkedUser => {
            if(checkedUser.id == currentId) {
                const ageUser = checkedUser.user.age !== undefined ? checkedUser.user.age : -1;
                if(minAge !== -1 && ageUser === -1) {
                    checkedUser.disabled = valueDisabled;
                } else if(minAge !== -1 && ageUser < minAge) {
                    checkedUser.disabled = valueDisabled;
                } else {
                    checkedUser.checked = valueChecked;
                    if(valueChecked) {
                        value.userIds === undefined ? value.userIds = [checkedUser.id] : value.userIds.push(checkedUser.id);
                    } else {
                        value.userIds === undefined ? value.userIds = [] : value.userIds = value.userIds.filter(item => item !== checkedUser.id);
                    }
                    onChange(value);
                }
            }
            return checkedUser;
        }));
    };

    // acknowledgeInvite
    const [acknowledgeInvite, setAcknowledgeInvite] = useState<Checked>({checked: false});

    const setAcknowledgeInviteChange = (valueChecked: boolean, valueDisabled: boolean) => {
        if (valueChecked) {
            setAcknowledgeInvite({checked: true});
            value.acknowledgeInvite === undefined ? value.acknowledgeInvite = true : value.acknowledgeInvite = true;
            onChange(value);
        } else {
            setAcknowledgeInvite({checked: false});
            value.acknowledgeInvite === undefined ? value.acknowledgeInvite = false : value.acknowledgeInvite = false;
            onChange(value);
        }
    };


    // acknowledgeInviteAge
    const [acknowledgeInviteAge, setAcknowledgeInviteAge] = useState<Checked>({checked: false});

    const setAcknowledgeInviteAgeChange = (valueChecked: boolean, valueDisabled: boolean) => {
        if (valueChecked) {
            setAcknowledgeInviteAge({checked: true});
            value.acknowledgeInviteAge === undefined ? value.acknowledgeInviteAge = true : value.acknowledgeInviteAge = true;
            onChange(value);
        } else {
            setAcknowledgeInviteAge({checked: false});
            value.acknowledgeInviteAge === undefined ? value.acknowledgeInviteAge = false : value.acknowledgeInviteAge = false;
            onChange(value);
        }
    };

    // emails

    const valueEmail = (index: number, friend: any): string => {
        return index === 0 ? emailValue : friend.value;
    }

    const valueDisabled = (index: number): boolean => {
        return index === 0 ? false : true;
    }

    const [emailValue, setEmailValue] = useState( "");

    const [unegisteredFriends, setUnegisteredFriends] = useState<Email[]>([{value: emailValue}]);

    const setEmailValueChange = (valueEmail: string) => {
        setEmailValue(valueEmail);
        if (unegisteredFriends.length === 1) {
            value.emails = [valueEmail];
        } else {
            value.emails?.splice(unegisteredFriends.length - 1, 1)
            value.emails?.push(valueEmail);
        }
        onChange(value);
        if (EMAIL_REGEX.test(valueEmail)) {
            if(unegisteredFriends.length === 1) {
                setUnegisteredFriends([{value: ""}, {value: valueEmail}]);
            } else {
                setUnegisteredFriends([...unegisteredFriends, {value: valueEmail}]);
            }
            setEmailValue("");
        }
    }

    // showInvite
    const [isCheckedShowInvite, setIsCheckedShowInvite] = useState<Checked>({checked: false});
    const setCheckedShowInviteChange = (valueChecked: boolean) => {
        if (valueChecked) {
            setIsCheckedShowInvite({checked: true});
        } else {
            setIsCheckedShowInvite({checked: false});
            setAcknowledgeInviteAge({checked: false});
            setAcknowledgeInvite({checked: false});
            setUnegisteredFriends([{value: ""}]);
            setEmailValue("");
            value.emails = [];
            value.acknowledgeInvite === undefined ? value.acknowledgeInvite = false : value.acknowledgeInvite = false;
            value.acknowledgeInviteAge === undefined ? value.acknowledgeInviteAge = false : value.acknowledgeInviteAge = false;
            onChange(value);
        }
    };


    return (
        <div>
            <Checkbox
                children = {user}
                checked = {user.checked}
                disabled = {user.disabled}
                onChange = {setUserChange}
                testId = {`user${id}`}
                currentId={user.id}
                className={`checkbox__warning`}
            />
            {checkedUsers?.map(currentFriend => (
                <Checkbox
                    children = {currentFriend.user}
                    checked = {currentFriend.checked}
                    disabled = {currentFriend.disabled}
                    onChange = {setFriendChange}
                    testId = {`user${currentFriend.id}`}
                    key={currentFriend.id}
                    currentId={currentFriend.id}
                />
            ))}
            <Checkbox
                children = {`Invite friends`}
                checked = {isCheckedShowInvite.checked}
                disabled = {false}
                onChange = {setCheckedShowInviteChange}
                className = {``}
                testId = {`showInvite`}
            />
            {
                isCheckedShowInvite.checked &&
                <div data-testid="invite">
                    {unegisteredFriends?.map((friend: any, index: number) => (
                        <TextInput
                            value={valueEmail(index, friend)}
                            placeholder={`Введите email незарегестрированного друга`}
                            onChange={setEmailValueChange}
                            disabled={valueDisabled(index)}
                            testId = {`email${index}`}
                            key={index}
                        />
                    ))}
                  <Checkbox
                    children = {`I acknowledge that Game Market invitation emails will be sent to specified emails. The game will become available to the person only onсe the registration in the Game Market is completed.`}
                    checked = {acknowledgeInvite.checked}
                    disabled = {false}
                    onChange = {setAcknowledgeInviteChange}
                    testId = {`acknowledgeInvite`}
                    className={`checkbox__warning`}
                  />
                    {
                        (value.game.restrictions !== undefined && typeof value.game.restrictions.minAge === "number")  &&
                        <Checkbox
                          children = {`I acknowledge that the game has age restriction and might be unavailable if a person is under required age.`}
                          checked = {acknowledgeInviteAge.checked}
                          disabled = {false}
                          onChange = {setAcknowledgeInviteAgeChange}
                          testId = {`acknowledgeInviteAge`}
                          className={`checkbox__warning`}
                        />
                    }
                </div>
            }
            {!checkedUsers && <Loading />}
        </div>
    );
}
