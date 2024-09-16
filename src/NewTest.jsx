import React, { useCallback, useState, useMemo } from 'react';
import { guid } from '@progress/kendo-react-common';
import { timezoneNames } from '@progress/kendo-date-math';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { IntlProvider, LocalizationProvider } from '@progress/kendo-react-intl';
import { Scheduler, TimelineView, DayView, WeekView, MonthView, AgendaView } from '@progress/kendo-react-scheduler';
import '@progress/kendo-theme-default/dist/all.css'; // Import the Kendo default theme

// Sample data
const baseData = [
  // ... (add your base data here, truncated for brevity)
];

// Locale and timezone data
const locales = [
  { language: 'en-US', locale: 'en' },
  { language: 'es-ES', locale: 'es' }
];

// Scheduler localization
const schedulerMessages = {
  today: "Hoy",
  allDay: "todo el dia",
  showWorkDay: "Mostrar horas laborables",
  showFullDay: "Mostrar día completo",
  agendaViewTitle: "Agenda",
  dayViewTitle: "Día",
  weekViewTitle: "Semana",
  workWeekViewTitle: "Semana laboral",
  monthViewTitle: "Mes"
};

const NewTest = () => {
  const timezones = useMemo(() => timezoneNames(), []);
  const [view, setView] = useState('day');
  const [date, setDate] = useState(new Date()); // Use the current date or a specific date
  const [locale, setLocale] = useState(locales[0]);
  const [timezone, setTimezone] = useState('Etc/UTC');
  const [orientation, setOrientation] = useState('horizontal');
  const [data, setData] = useState(baseData);

  const handleViewChange = useCallback((event) => {
    setView(event.value);
  }, []);

  const handleDateChange = useCallback((event) => {
    setDate(event.value);
  }, []);

  const handleLocaleChange = useCallback((event) => {
    setLocale(event.target.value);
  }, []);

  const handleTimezoneChange = useCallback((event) => {
    setTimezone(event.target.value);
  }, []);

  const handleOrientationChange = useCallback((event) => {
    setOrientation(event.target.getAttribute('data-orientation'));
  }, []);

  const handleDataChange = useCallback(({ created, updated, deleted }) => {
    setData(old =>
      old.filter(item => !deleted.find(current => current.TaskID === item.TaskID))
        .map(item => updated.find(current => current.TaskID === item.TaskID) || item)
        .concat(created.map(item => ({ ...item, TaskID: guid() })))
    );
  }, []);

  return (
    <div>
      <div className="example-config">
        <div className="row">
          <div className="col">
            <h5>Timezone:</h5>
            <DropDownList value={timezone} onChange={handleTimezoneChange} data={timezones} />
          </div>
          <div className="col">
            <h5>Locale:</h5>
            <DropDownList value={locale} onChange={handleLocaleChange} data={locales} textField="language" dataItemKey="locale" />
          </div>
          <div className="col">
            <h5>Orientation:</h5>
            <input type="radio" name="orientation" id="horizontal" data-orientation="horizontal" className="k-radio k-radio-md" checked={orientation === 'horizontal'} onChange={handleOrientationChange} />
            <label className="k-radio-label" htmlFor="horizontal">Horizontal</label>
            <br />
            <input type="radio" name="orientation" id="vertical" data-orientation="vertical" className="k-radio k-radio-md" checked={orientation === 'vertical'} onChange={handleOrientationChange} />
            <label className="k-radio-label" htmlFor="vertical">Vertical</label>
          </div>
        </div>
      </div>
      <LocalizationProvider language={locale.language}>
        <IntlProvider locale={locale.locale} messages={schedulerMessages}>
          <Scheduler
            data={data}
            onDataChange={handleDataChange}
            view={view}
            onViewChange={handleViewChange}
            date={date}
            onDateChange={handleDateChange}
            editable={true}
            timezone={timezone}
            group={{ resources: ['Rooms', 'Persons'], orientation }}
            resources={[
              {
                name: 'Rooms',
                data: [
                  { text: 'Meeting Room 101', value: 1 },
                  { text: 'Meeting Room 201', value: 2, color: '#FF7272' }
                ],
                field: 'RoomID',
                valueField: 'value',
                textField: 'text',
                colorField: 'color'
              },
              {
                name: 'Persons',
                data: [
                  { text: 'Peter', value: 1, color: '#5392E4' },
                  { text: 'Alex', value: 2, color: '#54677B' }
                ],
                field: 'PersonIDs',
                valueField: 'value',
                textField: 'text',
                colorField: 'color'
              }
            ]}
          >
            <TimelineView />
            <DayView />
            <WeekView />
            <MonthView />
            <AgendaView />
          </Scheduler>
        </IntlProvider>
      </LocalizationProvider>
    </div>
  );
};

export default NewTest;
