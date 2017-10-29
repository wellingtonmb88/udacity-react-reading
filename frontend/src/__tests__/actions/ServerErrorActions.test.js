
import * as ServerErrorActions from '../../actions/ServerErrorActions';

describe('ServerErrorActions suite test', () => {

    it('should create an action to show Server error', () => {
        const expectedAction = {
            type: ServerErrorActions.SHOW_ERROR
        };
        expect(ServerErrorActions.showError()).toEqual(expectedAction)
    });

    it('should create an action to close Server error', () => {
        const expectedAction = {
            type: ServerErrorActions.CLOSE_ERROR
        };
        expect(ServerErrorActions.closeError()).toEqual(expectedAction)
    });
});

