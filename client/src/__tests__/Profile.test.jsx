import React from 'react';
import "@testing-library/jest-dom";
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Profile from '../components/Profile';

describe('Profile component', () => {
    it('renders without crashing',() => {
        render(
            <MemoryRouter>
                <Profile />
            </MemoryRouter>

        );
    })
 })
