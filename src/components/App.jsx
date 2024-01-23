import { Component } from 'react';
import { nanoid } from 'nanoid';
import Form from './Form/Form';
import Title from './Form/Title';

import ContactList from './Form/ContacsList';
import Filter from './Form/FilterSearch';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],

    filter: '',
  };

  onChangeInput = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  onClickSubmit = event => {
    event.preventDefault();

    const { name } = this.state;
    const isExist = this.state.contacts.findIndex(
      el =>
        el.name.toLocaleLowerCase().trim() === name.toLocaleLowerCase().trim()
    );

    if (isExist >= 0) {
      alert(`Contact ${name} already exists!`);
      return;
    }

    this.setState({
      contacts: [
        ...this.state.contacts,
        {
          number: this.state.number,
          name: this.state.name,
          id: nanoid(),
        },
      ],
      name: '',
      number: '',
    });
    event.currentTarget.reset();
  };

  onClickDelete = event => {
    const selectContact = event.currentTarget.id;

    const updateContactAfterDelete = this.state.contacts.filter(
      item => item.id !== selectContact
    );

    this.setState({
      contacts: updateContactAfterDelete,
    });
  };

  render() {
    const contactsArr = Object.values(this.state.contacts);

    const filterContacts = contactsArr.filter(item =>
      item.name
        .toLocaleLowerCase()
        .includes(this.state.filter.toLocaleLowerCase())
    );

    return (
      <div className="App">
        <Title title="Phonebook">
          <Form
            onChangeInput={this.onChangeInput}
            onClickSubmit={this.onClickSubmit}
          />
        </Title>
        {this.state.contacts.length !== 0 ? (
          <Filter onChangeInput={this.onChangeInput} />
        ) : (
          ''
        )}
        {this.state.contacts.length !== 0 ? (
          <ContactList
            filterContacts={filterContacts}
            onChangeInput={this.onChangeInput}
            onClickDelete={this.onClickDelete}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}
