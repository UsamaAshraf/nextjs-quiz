# Some Considerations

- Catering for different types of questions. Programmed for two.

- Consider persisting state across page refreshes - questions, answers and timer.
Chose not to for simplcity's sake.

- Considered adding time tracking for individual questions 
- Did not go with reducers or Redux - kept it simple

- General idea was to have decent componenet decomposition and avoid unnecessary re-rendering as much as possible

- Using linter and prettifier to keep a standard code style, consistent with auto-formatting


<br>

# Potential Improvements

- Stricter validation - ensuring an option ID gets assigned to the right question and the right question type.

- Making form elements keyboard accessible.

- Separate module for holding all question and answer interfacing, comparisons - col-locating this would be better
for maintainability 

- Correct answers being in state, and result calculation happening on the client-side, means they're exposed.
Such calculations should be executed on the server-side.

- Create an interesting, meaningful link between the topic entered by the user and the questions returned.
