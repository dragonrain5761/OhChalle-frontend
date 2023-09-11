import React, { useState } from "react";
import {
  UpdatedTodo,
  useFetchTodos,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
  useUpdateIsSuccessMutation,
} from "../../api/TodoApi";
import {
  TodosContainer,
  TodoListContainer,
  TodosList,
  TodosBox,
  CalendarCenterBox,
  MoreButton,
  MoreButtonContainer,
  DayColor,
} from "./TodoList.style";
import TodoAddModal from "./TodoAddModal";
import Calendar, { Event as CalendarEvent } from "../calendar/Calendar";
import TodoUpdateModal from "./TodoUpdateModal";
import { useNavigate } from "react-router-dom";
import useTodoState from "../../hook/useTodoState";
import useModal from "../../hook/useModal";

type Todo = UpdatedTodo;

function TodoList() {
  const { data: todos, isLoading, isError } = useFetchTodos();
  const [todoToUpdate, setTodoToUpdate] = useState<Todo | null>(null);
  const deleteTodoMutation = useDeleteTodoMutation();
  const updateTodoMutation = useUpdateTodoMutation();
  const updateisCompleteMutation = useUpdateIsSuccessMutation();
  const navigate = useNavigate();
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const {
    events,
    filteredTodos,
    toggleButtonsVisibility,
    onMonthChange,
    visibleTodoId,
  } = useTodoState(todos);

  const addTodoModal = useModal();
  const updateTodoModal = useModal();

  const handleCheckboxChange = async (todo: Todo) => {
    const today = new Date();
    today.setHours(24, 0, 0, 0);

    if (new Date(todo.date) > today) {
      console.log(today);
      alert("이후 일정을 미리 완료할 수 없습니다.");
      return;
    }

    const updatedTodo = { ...todo, isComplete: !todo.isComplete };
    try {
      await updateisCompleteMutation.mutateAsync(updatedTodo);
      alert("완료된 일정은 더보기에서 확인할 수 있습니다.");
    } catch (error) {
      console.error("상태 업데이트 실패:", error);
    }
  };

  const todoDeleteHandler = async (todoId: string) => {
    try {
      await deleteTodoMutation.mutateAsync(todoId);
      alert("일정이 삭제되었습니다.");
      toggleButtonsVisibility(null);
    } catch (error) {
      console.log("todoId", todoId);
      console.error("삭제 실패:", error);
    }
  };

  const todoUpdateHandler = async (updatedTodo: Todo) => {
    try {
      await updateTodoMutation.mutateAsync(updatedTodo);
      console.log("수정 성공");
      updateTodoModal.closeModal();
      toggleButtonsVisibility(null);
    } catch (error) {
      console.error("수정 실패:", error);
    }
  };

  const onClickMoveTodolist = () => {
    navigate("/mypage/todolist");
  };

  const uncompletedTodos = filteredTodos.filter(
    (todo: Todo) => !todo.isComplete
  );

  const sortedUncompletedTodos = [...uncompletedTodos].sort((a, b) => {
    // 날짜를 Date 객체로 변환하여 비교
    const dateA: any = new Date(a.date);
    const dateB: any = new Date(b.date);
    return dateA - dateB;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <>
      <CalendarCenterBox>
        <Calendar
          events={events as CalendarEvent[]}
          onMonthChange={onMonthChange}
        />
      </CalendarCenterBox>
      <br></br>
      {addTodoModal.isOpen && (
        <TodoAddModal onRequestClose={addTodoModal.closeModal} />
      )}
      <TodosContainer>
        <div className="TodolsitTitle">
          <h2>투두 리스트</h2>
          <p onClick={onClickMoveTodolist}>더보기</p>
        </div>
        <TodoListContainer>
          <TodosList>
            {sortedUncompletedTodos.map((todo: Todo) => (
              <TodosBox key={todo.toDoId} $isComplete={todo.isComplete}>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(todo)}
                  checked={todo.isComplete}
                ></input>
                <div className="TodolistContent">
                  <h2>{todo.title}</h2>
                  <h3>{todo.content}</h3>
                  <h4>날짜 | {todo.date}</h4>
                  <div>
                    {daysOfWeek.map((day, index) => (
                      <DayColor
                        key={index}
                        $isCurrent={index === new Date(todo.date).getDay()}
                        $isComplete={todo.isComplete ?? false}
                      >
                        {day}
                      </DayColor>
                    ))}
                  </div>
                </div>
                <MoreButton
                  onClick={() => toggleButtonsVisibility(todo.toDoId)}
                >
                  ...
                </MoreButton>
                {visibleTodoId === todo.toDoId && (
                  <MoreButtonContainer
                    visible={visibleTodoId === todo.toDoId ? "true" : "false"}
                  >
                    <button
                      onClick={() => {
                        setTodoToUpdate(todo);
                        updateTodoModal.openModal();
                      }}
                    >
                      수 정
                    </button>
                    <button onClick={() => todoDeleteHandler(todo.toDoId)}>
                      삭 제
                    </button>
                  </MoreButtonContainer>
                )}
              </TodosBox>
            ))}
          </TodosList>
        </TodoListContainer>
        <button onClick={addTodoModal.openModal}>+</button>
      </TodosContainer>
      {updateTodoModal.isOpen && (
        <TodoUpdateModal
          isOpen={updateTodoModal.isOpen}
          todo={todoToUpdate}
          onSubmit={todoUpdateHandler}
          onRequestClose={updateTodoModal.closeModal}
          isComplete
        />
      )}
    </>
  );
}

export default TodoList;
