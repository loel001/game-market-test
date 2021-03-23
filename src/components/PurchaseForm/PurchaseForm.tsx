import React, {useContext,} from 'react';
import {BuyStatus, Purchase} from '../../data/types';
import {CurrentUserContext} from "../Context";
import {Loading} from '../Common/Loading';
import {PurchaseList} from "./PurchaseList";

interface PurchaseFormProps {
    value: Purchase;
    onChange: (value: Purchase) => void;
    buyStatus?: BuyStatus;
}

export function PurchaseForm({value, onChange}: PurchaseFormProps) {
    const currentUser = useContext(CurrentUserContext);
    if (!currentUser) {
        return <Loading />;
    }

    const ageUser = currentUser.age !== undefined ? currentUser.age : -1;

    return (
        <PurchaseList id={currentUser.id} ageAkkaunt={ageUser} value={value} onChange={onChange} />
    );
}
