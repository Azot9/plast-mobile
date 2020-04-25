export const setToken = token => ({
  type: 'SAVE_TOKEN',
  token
})

export const setUser = user => ({
  type: 'SAVE_USER',
  user
})

export const setGurtok = gurtok => ({
  type: 'SAVE_GURTOK',
  gurtok
})

export const setCurrentChild = child_id => ({
  type: 'SET_CHILD',
  child_id
})

export const setCurrentChecklist = checklist_id => ({
  type: 'SET_CHECKLIST',
  checklist_id
})
