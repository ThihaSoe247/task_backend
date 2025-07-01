const Tasks = require("../model/Tasks"); // adjust path if needed

const taskController = {
  getAll: async (req, res) => {
    try {
      const tasks = await Tasks.find().sort({ createdAt: -1 });
      return res.json(tasks);
    } catch (error) {
      return res.status(500).json({ msg: "Server Error" });
    }
  },

  addTask: async (req, res) => {
    try {
      const { title, description } = req.body;
      if (!title || !description) {
        return res.status(400).json({ msg: "Title and description required" });
      }

      const newTask = await Tasks.create({ title, description });
      return res.status(201).json(newTask);
    } catch (error) {
      return res.status(500).json({ msg: "Server Error" });
    }
  },

  getOneTask: async (req, res) => {
    try {
      const id = req.params.id;
      const task = await Tasks.findById(id);
      if (!task) return res.status(404).json({ msg: "Task not found" });
      return res.json(task);
    } catch (error) {
      return res.status(500).json({ msg: "Server Error" });
    }
  },

  deleteTask: async (req, res) => {
    try {
      const id = req.params.id;
      const task = await Tasks.findByIdAndDelete(id);
      if (!task) return res.status(404).json({ msg: "Task not found" });
      return res.json({ msg: "Task deleted", task });
    } catch (error) {
      return res.status(500).json({ msg: "Server Error" });
    }
  },

  updateTask: async (req, res) => {
    try {
      const id = req.params.id;
      const task = await Tasks.findByIdAndUpdate(id, req.body, { new: true });
      if (!task) return res.status(404).json({ msg: "Task not found" });
      return res.json(task);
    } catch (error) {
      return res.status(500).json({ msg: "Server Error" });
    }
  },
  registerUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = new User({ username, password: password });
      await user.save();
      res.status(201).json({
        message: "User Registerd Successfully",
      });
    } catch (error) {
      res.status(500).json({
        error: "Register Failed",
      });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: "Authentication failed" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Authentication failed" });
      }
      const token = jwt.sign({ userId: user._id }, "your-secret-key", {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  },
};

module.exports = taskController;
