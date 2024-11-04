import { createSlice } from "reduxjs/toolkit";

const initialState = {
  availableRooms: [],
};

const availabilitySlice = createSlice({
  name: "availability",
  initialState,
  reducers: {
    update: (state, { room }) => {
      state.availableRooms.push({
        roomName: room.roomName,
        type: room.type,
        price: room.price,
        image: room.image,
      });
    },
  },
});

export const { update } = availabilitySlice.action;

export const selectAvailableRooms = (state) =>
  state.availability.availableRooms;
