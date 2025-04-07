# How To Run

`npm ci`

`npm run dev` (app will boot on port 3000).

Or `npm run dev -- -p 4000` to run on a specific port.

<br>

# Some Considerations

- Catering for different types of questions. Programmed for two.

- Consider persisting state across page refreshes using localStorage - questions, answers and timer. Chose not to for simplcity's sake.

- Considered adding time tracking for individual questions, but couldn't really pin down how that would work; a user can edit
their answer to a question any time and does not necessarily have to submit answers in order.

- Did not go with reducers or Redux - kept state management simple.

- General idea was to have decent component decomposition and avoid unnecessary re-rendering as much as possible.

- Using linter and prettifier to keep a standard code style, consistent with auto-formatting.

- Spent considerable time, perhaps too much, on writing Answer as a separate entity vs an attribute of the Question entity.


<br>

# Potential Improvements

- Stricter validation - ensuring an option ID gets assigned to the right question and the right question type.

- Making form elements keyboard accessible.

- Separate module (quiz) for holding all question and answer interfacing, comparisons - co-locating this would be better
for maintainability.

- Correct answers being in state, and result calculation happening on the client-side, means they're exposed. Such calculations should be executed on the server-side.

- Create a somewhat interesting, meaningful link between the topic entered by the user and the questions returned.

- Division of global context perhaps, e.g. separate for questions, as opposed to having one app context.
