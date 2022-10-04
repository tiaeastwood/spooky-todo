import { useEffect, useState } from "react";
import TaskDetails from "../components/TaskDetails";
import { useTasksContext } from "../hooks/useTasksContext";
import Loading from "../components/Loading";
import TaskForm from "../components/TaskForm";

const Home = () => {
	const { tasks, dispatch } = useTasksContext();
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		const fetchTasks = async () => {
			const response = await fetch("http://localhost:4000/api/toboolist");
			const json = await response.json();

			if (response.ok) {
				dispatch({ type: "SET_TASKS", payload: json });
			}
		};

		fetchTasks();
	}, [dispatch]);

	if (!tasks) {
		return <Loading />;
	}

	return (
		<div className="page">
			<div className="tasks-container">
				{tasks &&
					tasks.map((task, index) => (
						<TaskDetails key={task._id + index} task={task}>
							{task.title}
						</TaskDetails>
					))}
			</div>
			<span
				class="material-symbols-outlined add-new-task-button"
				onClick={handleShow}
			>
				add
			</span>
			{show && <TaskForm handleClose={handleClose} />}
		</div>
	);
};

export default Home;
