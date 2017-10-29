
import * as CommentFormActions from '../../actions/CommentFormActions';

describe('CommentFormActions suite test', () => {

    it('should create an action to open Comment Form', () => {
        const commentId = "AKO-Mejek-ode-o03093";
        const expectedAction = {
            type: CommentFormActions.OPEN_COMMENT_FORM,
            commentId
        };
        expect(CommentFormActions.openForm(commentId)).toEqual(expectedAction)
    });

    it('should create an action to close Comment Form', () => {
        const expectedAction = {
            type: CommentFormActions.CLOSE_COMMENT_FORM
        };
        expect(CommentFormActions.closeForm()).toEqual(expectedAction)
    });
});

