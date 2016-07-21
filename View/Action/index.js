
import {AJAX_DATA, ADD_TODO, REMOVE_TODO, UPDATE_TODO, AJAX_SUCCEED, AJAX_FAILED, AJAX_RELOAD } from '../Config/actionType'

export function ajaxData(data) {
    return { type: AJAX_DATA, data };
}

export function addTodo(data) {
    return { type: ADD_TODO, data };
}

export function removeTodo(data) {
    return { type: REMOVE_TODO, data };
}

export function updateTodo(data) {
    return { type: UPDATE_TODO, data };
}

export function ajaxSucceed(data) {
    return { type: AJAX_SUCCEED, data };
}

export function ajaxFailed(data) {
    return { type: AJAX_FAILED, data };
}

export function ajaxReload(data) {
    return { type: AJAX_RELOAD, data };
}