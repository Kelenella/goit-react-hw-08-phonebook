import s from './ContactsList.module.css';
import { fetchContacts, removeContact } from '../../redux/phonebook/operations';
import { getFilteredContacts } from '../../redux/phonebook/selector';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function ContactList() {
  const contacts = useSelector(getFilteredContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <ul>
        {contacts.map(({ name, number, id }) => (
          <li key={id} className={s.item}>
            <p className={s.item}>{name}:</p>
            <p className={s.item}>{number}</p>
            <button
              key={id}
              type="button"
              className={s.button}
              onClick={() => dispatch(removeContact(id))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
