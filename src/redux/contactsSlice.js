import { createSelector, createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./contactsOps";
import { selectNameFilter } from "./filtersSlice";

const initialState = {
  items: [],
  loading: false,
  error: null,
};
const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};
const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
const contactsSlice = createSlice({
  name: "contacts",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(deleteContact.rejected, handleRejected);
  },
});
export const contactsReducer = contactsSlice.reducer;
export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filtredValue) => {
    return contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(filtredValue.toLowerCase());
    });
  }
);
