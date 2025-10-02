#!/usr/bin/env python3
"""
Startup script for School Management System Backend
"""

import os
import sys
import subprocess
from pathlib import Path

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 8):
        print("Error: Python 3.8 or higher is required")
        sys.exit(1)
    print(f"✓ Python {sys.version.split()[0]} detected")

def install_requirements():
    """Install required packages"""
    requirements_file = Path(__file__).parent / "requirements.txt"
    if requirements_file.exists():
        print("Installing requirements...")
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", str(requirements_file)])
        print("✓ Requirements installed")
    else:
        print("Warning: requirements.txt not found")

def setup_environment():
    """Setup environment variables"""
    env_file = Path(__file__).parent / ".env"
    env_example = Path(__file__).parent / "config.env.example"
    
    if not env_file.exists() and env_example.exists():
        print("Creating .env file from example...")
        env_file.write_text(env_example.read_text())
        print("✓ .env file created. Please update with your actual values.")
    elif env_file.exists():
        print("✓ .env file found")
    else:
        print("Warning: No environment configuration found")

def create_directories():
    """Create necessary directories"""
    directories = ["logs", "uploads", "temp"]
    for directory in directories:
        Path(__file__).parent / directory
        os.makedirs(directory, exist_ok=True)
    print("✓ Directories created")

def main():
    """Main setup function"""
    print("🚀 Setting up School Management System Backend...")
    print("=" * 50)
    
    check_python_version()
    install_requirements()
    setup_environment()
    create_directories()
    
    print("=" * 50)
    print("✅ Setup complete!")
    print("\nNext steps:")
    print("1. Update .env file with your actual configuration values")
    print("2. Run: python app.py")
    print("3. API will be available at: http://localhost:5000")

if __name__ == "__main__":
    main()
