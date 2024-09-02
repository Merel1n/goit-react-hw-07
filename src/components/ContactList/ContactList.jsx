import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";
import { useMemo } from "react";

const ContactList = () => {
  const contacts = useSelector((state) => state.contacts.items);
  const filterValue = useSelector((state) => state.filter.filterValue);
  const dispatch = useDispatch();
  const onDeleteContact = (profileId) => {
    dispatch(deleteContact(profileId));
  };

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(filterValue.toLowerCase());
      }),
    [contacts, filterValue]
  );

  return (
    <ul className={css.list}>
      {filteredContacts.map((contact) => (
        <li key={contact.id} className={css.item}>
          <Contact
            id={contact.id}
            name={contact.name}
            number={contact.number}
            onDeleteContact={onDeleteContact}
          />
        </li>
      ))}
    </ul>
  );
};
export default ContactList;
