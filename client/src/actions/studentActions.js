import {
    SET_STUDENTS,
    BASE_URL,
    SET_CURRENT_STUDENT
} from './types';
import axios from 'axios';

// Async Action
export const startSetStudents = (pageNo = 1, search) => dispatch => {
    let url = `${BASE_URL}/admin/students?pageNo=${pageNo}`;
    if (search) {
        url += `&search=${search}`;
    }
    return axios.get(url)
        .then(res => {
            dispatch(setStudents(res.data.data));
            return Promise.resolve(res.data.data);
        })
        .catch(err => {
            return Promise.reject(err);
        });
};

export const startAddStudents = (data) => dispatch => {
    let url = `${BASE_URL}/admin/students`;
    return axios.post(url, data)
        .then(res => {
            return Promise.resolve(res.data);
        })
        .catch(err => {
            return Promise.reject(err.response);
        })
};

export const startUpdateStudent = (id, data) => dispatch => {
    let url = `${BASE_URL}/admin/students/${id}`;
    return axios.put(url, data)
        .then(res => {
            return Promise.resolve(res.data);
        })
        .catch(err => {
            return Promise.reject(err.response);
        });
};

export const startSetCurrentStudent = (id) => dispatch => {
    let url = `${BASE_URL}/admin/students/${id}`;
    return axios.get(url)
        .then(res => {
            dispatch(setCurrentStudent(res.data.student));
            return Promise.resolve(res.data);
        })
        .catch(err => {
            return Promise.reject(err.response);
        });
};

export const startRemoveStudent = (id) => dispatch => {
    let url = `${BASE_URL}/admin/students/${id}`;
    return axios.delete(url)
        .then(res => {
            return Promise.resolve(res.data);
        })
        .catch(err => {
            return Promise.reject(err.response);
        })
};

// Sync Action
export const setStudents = (studentsData) => {
    return {
        type: SET_STUDENTS,
        payload: studentsData
    };
}

export const setCurrentStudent = (student) => {
    return {
        type: SET_CURRENT_STUDENT,
        payload: { student }
    };
};