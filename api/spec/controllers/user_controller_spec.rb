require 'rails_helper'

RSpec.describe UserController, type: :controller do

  let(:current_user) { create(:user) }

  let(:valid_attributes) { { email: 'rspec@test.com', password: 'password', password_confirmation: 'password', first: 'test', last: 'user' } }

  let(:invalid_attributes) { { email: nil } }

  before do
    payload = { user_id: current_user.id }
    session = JWTSessions::Session.new(payload: payload)
    @tokens = session.login
  end

  describe 'GET #index' do
    let!(:user) { create(:user) }

    it 'returns a success response' do
      request.cookies[JWTSessions.access_cookie] = @tokens[:access]
      get :index
      expect(response).to be_successful
      expect(response_json['data'].size).to eq 2
      expect(response_json['data'].last['id']).to eq user.id.to_s
    end

    # usually there's no need to test this kind of stuff
    # within the resources endpoints
    # the quick spec is here only for the presentation purposes
    it 'unauth without cookie' do
      get :index
      expect(response).to have_http_status(401)
    end
  end

  describe 'GET #show' do
    let!(:user) { create(:user) }

    it 'returns a success response' do
      request.cookies[JWTSessions.access_cookie] = @tokens[:access]
      get :show, params: { id: user.id }
      expect(response).to be_successful
    end
  end

  describe 'PUT #update' do
    let!(:user) { create(:user) }

    context 'with valid params' do
      let(:new_attributes) {
        { first: 'first name' }
      }

      it 'updates the requested user' do
        request.cookies[JWTSessions.access_cookie] = @tokens[:access]
        request.headers[JWTSessions.csrf_header] = @tokens[:csrf]
        put :update, params: { id: user.id, user: new_attributes }
        user.reload
        expect(user.first).to eq new_attributes[:first]
      end

      it 'renders a JSON response with the user' do
        request.cookies[JWTSessions.access_cookie] = @tokens[:access]
        request.headers[JWTSessions.csrf_header] = @tokens[:csrf]
        put :update, params: { id: user.to_param, user: valid_attributes }
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq('application/json')
      end
    end

    context 'with invalid params' do
      it 'renders a JSON response with errors for the user' do
        request.cookies[JWTSessions.access_cookie] = @tokens[:access]
        request.headers[JWTSessions.csrf_header] = @tokens[:csrf]
        put :update, params: { id: user.to_param, user: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json')
      end
    end
  end

  describe 'DELETE #destroy' do
    let!(:user) { create(:user) }

    it 'destroys the requested user' do
      request.cookies[JWTSessions.access_cookie] = @tokens[:access]
      request.headers[JWTSessions.csrf_header] = @tokens[:csrf]
      expect {
        delete :destroy, params: { id: user.id }
      }.to change(User, :count).by(-1)
    end
  end

end
