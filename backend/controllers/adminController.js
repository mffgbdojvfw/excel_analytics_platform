

const File = require('../models/File');
const User = require("../models/User.js")
const Insight = require("../models/insight");


const fs = require('fs');
const path = require('path');

const getAllFiles = async (req, res) => {
  try {
    const files = await File.find().populate('uploadedBy', 'name email');
    res.status(200).json({ files });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFile = await File.findByIdAndDelete(id);

    if (!deletedFile) {
      return res.status(404).json({ message: 'File not found' });
    }

    // 🛡️ Safety check to ensure filename exists
    if (deletedFile.fileName) {
      const filePath = path.join(__dirname, '../uploads', deletedFile.fileName);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('File delete failed from disk:', err);
        } else {
          console.log('File deleted from disk:', filePath);
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'File deleted successfully',
      deletedFile,
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ message: 'Error deleting file', error: error.message });
  }
};






// 3. Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude passwords
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};


// 5. Toggle User Status (active/inactive)
const toggleUserStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.active = !user.active;
    await user.save();
    res.json({ message: `User is now ${user.active ? 'active' : 'inactive'}`, user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to toggle user status' });
  }
};

// 6. Get Insight Usage Logs per user
const getInsightUsageLogs = async (req, res) => {
  try {
    const logs = await Insight.aggregate([
      {
        $group: {
          _id: '$userId',
          totalInsights: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          _id: 0,
          userId: '$user._id',
          email: '$user.email',
          role: '$user.role',
          totalInsights: 1,
        },
      },
    ]);

    res.json({ logs });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch insight logs' });
  }
};

// 7. Get System Alerts (from logs.json or static array)
const getSystemAlerts = async (req, res) => {
  try {
    const logsPath = path.join(__dirname, '../logs/system_logs.json');
    const logs = fs.existsSync(logsPath)
      ? JSON.parse(fs.readFileSync(logsPath, 'utf-8'))
      : [
          { type: 'warning', message: 'Low disk space', timestamp: new Date() },
          { type: 'error', message: 'Failed to backup DB', timestamp: new Date() },
        ];

    res.json({ alerts: logs });
  } catch (err) {
    res.status(500).json({ message: 'Error reading system alerts' });
  }
};




module.exports = { getAllFiles,deleteFile,getAllUsers,toggleUserStatus,getInsightUsageLogs,getSystemAlerts };

