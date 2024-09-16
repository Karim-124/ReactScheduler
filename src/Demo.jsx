import React, { useState, useCallback } from 'react';
import Paper from '@mui/material/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  MonthView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui';

// Sample data
const appointments = [
  {
    id: 0,
    title: 'Meeting',
    startDate: '2017-05-25T09:00:00',
    endDate: '2017-05-25T10:00:00',
    roomId: 1,
    members: [1, 2],
  },
  {
    id: 1,
    title: 'Conference',
    startDate: '2017-05-26T11:00:00',
    endDate: '2017-05-26T12:00:00',
    roomId: 2,
    members: [2, 3],
  },
  // Add more appointments as needed
];

const resourcesData = [
  { id: 1, text: 'Room A' },
  { id: 2, text: 'Room B' },
  // Add more resources as needed
];

const owners = [
  { id: 1, text: 'John', color: '#f57f17' },
  { id: 2, text: 'Jane', color: '#0288d1' },
  { id: 3, text: 'Paul', color: '#388e3c' },
  // Add more entries as needed
];

const Demo = () => {
  const [data, setData] = useState(appointments);
  const [resources] = useState([
    {
      fieldName: 'roomId',
      title: 'Room',
      instances: resourcesData,
    },
    {
      fieldName: 'members',
      title: 'Members',
      instances: owners,
      allowMultiple: true,
    },
  ]);

  const commitChanges = useCallback(({ added, changed, deleted }) => {
    setData((prevData) => {
      let newData = [...prevData];
      if (added) {
        const startingAddedId = newData.length > 0 ? newData[newData.length - 1].id + 1 : 0;
        newData = [...newData, { id: startingAddedId, ...added }];
      }
      if (changed) {
        newData = newData.map((appointment) =>
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
        );
      }
      if (deleted !== undefined) {
        newData = newData.filter((appointment) => appointment.id !== deleted);
      }
      return newData;
    });
  }, []);

  return (
    <Paper>
      <Scheduler data={data}>
        <ViewState defaultCurrentDate="2017-05-25" />
        <EditingState onCommitChanges={commitChanges} />
        <EditRecurrenceMenu />
        <MonthView />
        <Appointments />
        <AppointmentTooltip showOpenButton />
        <AppointmentForm />
        <Resources data={resources} mainResourceName="roomId" />
        <DragDropProvider />
      </Scheduler>
    </Paper>
  );
};

export default Demo;
