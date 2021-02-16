import React, {useState, useEffect} from "react";
import '../styles/list.css'

const List = () =>{

    const [ todos, setTodos ] = useState( [] );
    const [ completed, setCompleted ] = useState( [] );
    const [ darkMode, setDarkMode ] = useState( false );
    const [ userInfo, setUserInfo ] = useState( null );
    const [taskInfo, setTaskInfo]= useState( null );

    const [num, setNum] = useState(1);


    useEffect( () => {
        const getData = async() => {
            const data = await fetch( 'https://jsonplaceholder.typicode.com/users/' + num );
            const dataJson = await data.json();
            setUserInfo( dataJson );
            const data1 = await fetch( 'https://jsonplaceholder.typicode.com/users/' + num + '/todos' );
            const dataJson1 = await data1.json();
            setTaskInfo( dataJson1 );
        };
        getData();

    }, [num] );


    useEffect( () => {
        console.log( 'efecto', todos.length );
        if( todos.length > 0 ) {
            document.title = `${ todos.length } tareas pendientes`;
        } else {
            document.title = `No tienes tareas pendientes`;
        }
    }, [ todos ] );



    const handleAddTask = () => {
        const task = document.querySelector( '#task' ).value;
        setTodos( prevState => [ ...prevState, task ] );
        document.querySelector( '#task' ).value = '';
    };

    const previousUser = () => {
        setNum(num - 1)
        console.log(num);
    };

    const nextUser = () => {
        setNum(num + 1)
        console.log(num);
    }


    const handleDeleteTask = ( index ) => {
        setTaskInfo( ( prevState ) => {
            return prevState.filter( ( taskInfo, i ) => i !== index );
        } );
    };

    const handleCompleteTask = ( index ) => {

        const taskInfoUpdate=[...taskInfo];

        taskInfoUpdate[index].completed=true;

        setTaskInfo(taskInfoUpdate);


    };

    const handleChangeTheme = () => {
        console.log('cambio de color')
        setDarkMode(!darkMode)
        setDarkMode( (prevDarkMode ) => !prevDarkMode )
    }

    return (
        <div>

            <div>
                {
                    num >1 &&
                    <button id="previousUser" onClick={ previousUser }>Anterior usuario</button>
                }

                {
                    num < 10 &&
                    <button id="nextUser" onClick={ nextUser }>Siguiente usuario</button>
                }


                <h1>Información del usuario {num}</h1>
                {
                    userInfo
                        ?
                        <ul>
                            <li> Nombre: {userInfo.name}</li>
                            <li> Usuario: { userInfo.username }</li>
                            <li> Email: {userInfo.email}</li>
                            <li> Web: {userInfo.website}</li>
                            <li> Teléfono: {userInfo.phone}</li>
                        </ul>
                        : 'cargando datos'
                }
            </div>


            <div>
                <label htmlFor='task'>Tarea</label>
                <input type='text' id='task' />
                <button onClick={ handleAddTask }>Agregar tarea</button>
            </div>

            {
                taskInfo
                    ?
                    <div>
                        <h1>Lista de tareas pendientes ({ taskInfo.length } en total)</h1>

                        <table>
                            <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th>Eliminar</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                taskInfo.map( ( taskInfo, index ) => (
                                        <tr key={ index }>
                                            <td>{ taskInfo.title }</td>
                                            <td>
                                                {
                                                    taskInfo.completed
                                                        ? <button className="dark-mode">Completada</button>
                                                        :<button className="dark-mode1" onClick={()=>handleCompleteTask(index)}>
                                                            Marcar como completada
                                                        </button>

                                                }

                                            </td>
                                            <td>
                                                <button id="delete" onClick={ () => handleDeleteTask( index ) }>Eliminar</button>
                                            </td>
                                        </tr>

                                    )
                                )
                            }

                            </tbody>
                        </table>
                    </div>

                    :'cargando datos'
            }

        </div>

    );



};
export default List;