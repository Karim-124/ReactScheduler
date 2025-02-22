import * as React from 'react';
import { ScheduleComponent, ResourcesDirective, ResourceDirective, ViewsDirective, ViewDirective, Inject, TimelineViews, Resize, DragAndDrop, TimelineMonth, Day } from '@syncfusion/ej2-react-schedule';
import './block-events.css';  // Ensure this path is correct
import { extend } from '@syncfusion/ej2-base';
import dataSource from './datasource.json';  // Import the JSON data

/**
 * Schedule block events sample
 */
const BlockEvents = () => {
    // Extend and use the blockData from the JSON file
    const data = extend([], dataSource.blockData, null, true);
    const employeeData = [
        { Text: 'Alice', Id: 1, GroupId: 1, Color: '#bbdc00', Designation: 'Content writer' },
        { Text: 'Nancy', Id: 2, GroupId: 2, Color: '#9e5fff', Designation: 'Designer' },
        { Text: 'Robert', Id: 3, GroupId: 1, Color: '#bbdc00', Designation: 'Software Engineer' },
        { Text: 'Robson', Id: 4, GroupId: 2, Color: '#9e5fff', Designation: 'Support Engineer' },
        { Text: 'Laura', Id: 5, GroupId: 1, Color: '#bbdc00', Designation: 'Human Resource' },
        { Text: 'Margaret', Id: 6, GroupId: 2, Color: '#9e5fff', Designation: 'Content Analyst' }
    ];

    const getEmployeeName = (value) => {
        return value.resourceData[value.resource.textField];
    };

    const getEmployeeImage = (value) => {
        return getEmployeeName(value).toLowerCase();
    };

    const getEmployeeDesignation = (value) => {
        return value.resourceData.Designation;
    };

    const resourceHeaderTemplate = (props) => {
        return (
            <div className="template-wrap">
                <div className="employee-category">
                    <div className={`employee-image ${getEmployeeImage(props)}`} />
                    <div className="employee-name"> {getEmployeeName(props)}</div>
                    <div className="employee-designation">{getEmployeeDesignation(props)}</div>
                </div>
            </div>
        );
    };

    return (
        <div className='schedule-control-section'>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper drag-sample-wrapper'>
                    <div className="schedule-container">
                        <ScheduleComponent
                            cssClass='block-events'
                            width='100%'
                            height='650px'
                            selectedDate={new Date(2021, 7, 2)}
                            currentView='TimelineDay'
                            resourceHeaderTemplate={resourceHeaderTemplate}
                            eventSettings={{ dataSource: data }}
                            group={{ enableCompactView: false, resources: ['Employee'] }}
                        >
                            <ResourcesDirective>
                                <ResourceDirective
                                    field='EmployeeId'
                                    title='Employees'
                                    name='Employee'
                                    allowMultiple={true}
                                    dataSource={employeeData}
                                    textField='Text'
                                    idField='Id'
                                    colorField='Color'
                                />
                            </ResourcesDirective>
                            <ViewsDirective>
                                <ViewDirective option='Day' />
                                <ViewDirective option='TimelineDay' />
                                <ViewDirective option='TimelineMonth' />
                            </ViewsDirective>
                            <Inject services={[Day, TimelineViews, TimelineMonth, Resize, DragAndDrop]} />
                        </ScheduleComponent>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlockEvents;
