
import * as PostFormActions from '../../actions/PostFormActions';

describe('PostFormActions suite test', () => {

    it('should create an action to open Post Form', () => {
        const postId = "AKO-Mejek-ode-o03093";
        const expectedAction = {
            type: PostFormActions.OPEN_FORM,
            postId
        };
        expect(PostFormActions.openForm(postId)).toEqual(expectedAction)
    });

    it('should create an action to close Post Form', () => {
        const expectedAction = {
            type: PostFormActions.CLOSE_FORM
        };
        expect(PostFormActions.closeForm()).toEqual(expectedAction)
    });
});

