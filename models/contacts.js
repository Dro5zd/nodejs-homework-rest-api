const fs = require('fs/promises');
const path = require('path');

const contactsArr = path.join(__dirname, './contacts.json');

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsArr, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsArr);
    return JSON.parse(data);
  } catch (e) {
    console.log(e);
  }
};
const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    return await contacts.find(item => item.id === contactId) || null;
  } catch (e) {
    console.log(e);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = await contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
      return null;
    }
    contacts.splice(index, 1);
    await updateContacts(contacts);
    return contacts;
  } catch (e) {
    console.log(e);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = {id: Date.now().toString(), ...body};
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
  } catch (e) {
    console.log(e);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = await contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
      return null;
    }
    contacts[index] = {id: contactId, ...body};
    await updateContacts(contacts);
    return contacts[index];
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
