#!/bin/bash

# Fortuity Lab Demo Startup Script
# This script helps you start the demo quickly

set -e

echo "🧪 Fortuity Lab - Demo Startup Script"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed."
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        return 0
    else
        return 1
    fi
}

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
    echo ""
fi

# Start backend server
echo "🚀 Starting backend server on port 3001..."
if check_port 3001; then
    echo "⚠️  Port 3001 is already in use."
    echo "The backend server might already be running."
    echo ""
else
    npm start &
    BACKEND_PID=$!
    echo "✅ Backend server started (PID: $BACKEND_PID)"
    echo ""
    
    # Wait for server to be ready
    echo "⏳ Waiting for server to be ready..."
    for i in {1..10}; do
        if curl -s http://localhost:3001/health > /dev/null 2>&1; then
            echo "✅ Backend server is ready!"
            break
        fi
        sleep 1
    done
    echo ""
fi

# Ask user which demo to run
echo "Which demo would you like to run?"
echo ""
echo "1) Simple HTML Demo (instant, no build required)"
echo "2) React Application (professional UI)"
echo "3) Both (HTML demo + React app)"
echo "4) Just keep backend running"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🌐 Opening HTML demo..."
        if [[ "$OSTYPE" == "darwin"* ]]; then
            open index.html
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            xdg-open index.html 2>/dev/null || echo "Please open index.html in your browser"
        else
            echo "Please open index.html in your browser"
        fi
        echo ""
        echo "✅ Demo is ready!"
        echo "   - HTML Demo: Open index.html in browser"
        echo "   - Backend API: http://localhost:3001"
        ;;
    2)
        echo ""
        echo "🎨 Starting React application..."
        cd client
        if [ ! -d "node_modules" ]; then
            echo "📦 Installing React dependencies (this may take a minute)..."
            npm install
        fi
        echo "🚀 Starting React dev server..."
        npm start
        ;;
    3)
        echo ""
        echo "🌐 Opening HTML demo..."
        if [[ "$OSTYPE" == "darwin"* ]]; then
            open index.html
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            xdg-open index.html 2>/dev/null || echo "Please open index.html in your browser"
        else
            echo "Please open index.html in your browser"
        fi
        echo ""
        echo "🎨 Starting React application..."
        cd client
        if [ ! -d "node_modules" ]; then
            echo "📦 Installing React dependencies (this may take a minute)..."
            npm install
        fi
        echo "🚀 Starting React dev server..."
        npm start
        ;;
    4)
        echo ""
        echo "✅ Backend server is running!"
        echo ""
        echo "📝 Next steps:"
        echo "   - Open index.html for simple demo"
        echo "   - Run 'cd client && npm start' for React app"
        echo "   - Test API at http://localhost:3001"
        echo ""
        echo "Press Ctrl+C to stop the backend server"
        wait $BACKEND_PID
        ;;
    *)
        echo ""
        echo "Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Enjoy exploring Fortuity Lab!"
echo ""
echo "Demo Credentials:"
echo "  - admin / admin123 (Administrator)"
echo "  - embryo1 / embryo123 (Embryologist)"
echo "  - andro1 / andro123 (Andrologist)"
echo ""
echo "📚 Documentation:"
echo "  - Quick Start: QUICK-START.md"
echo "  - Analysis: DEMO-ANALYSIS.md"
echo "  - API Docs: README.md"
echo ""
