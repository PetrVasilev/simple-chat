import React, { useContext } from 'react'
import styled from 'styled-components'

import { State } from '../context'
import { REMOVE_CONTACT } from '../context/contacts'
import { phoneMasked } from '../utils'
import { ReactComponent as CloseIcon } from '../assets/icons/close.svg'

const View = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`

const Contact = styled.div`
    padding: 10px;
    border-bottom: 2px solid #e4e4e4;
    display: flex;
    flex-direction: row;
    background: white;
    align-items: center;
    justify-content: space-between;

    .info {
        .name {
            font-size: 14px;
        }

        .phone {
            color: gray;
            margin-top: 5px;
            font-size: 12px;
        }
    }

    .delete {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: 0.3s opacity;

        &:hover {
            opacity: 0.7;
        }

        svg {
            width: 20px;
            height: 20px;

            line {
                stroke: red !important;
            }
        }
    }
`

const Contacts = () => {
    const { contactsState } = useContext(State)

    const [contacts, dispatchContacts] = contactsState

    const handleDeleteContact = (contact) => {
        dispatchContacts({
            type: REMOVE_CONTACT,
            data: contact
        })
    }

    return (
        <View>
            {contacts.map((item) => (
                <Contact key={item.phone}>
                    <div className="info">
                        <div className="name">{item.name}</div>
                        <div className="phone">{phoneMasked(item.phone)}</div>
                    </div>
                    <div onClick={() => handleDeleteContact(item)} className="delete">
                        <CloseIcon />
                    </div>
                </Contact>
            ))}
        </View>
    )
}

export default Contacts
